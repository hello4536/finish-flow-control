
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const inviteSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  role: z.enum(["admin", "employee"], {
    required_error: "Please select a role for the user",
  }),
});

type InviteFormValues = z.infer<typeof inviteSchema>;

interface InviteUserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const InviteUserForm: React.FC<InviteUserFormProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { organization } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionCheckFailed, setSubscriptionCheckFailed] = useState(false);
  const [employeeLimit, setEmployeeLimit] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  
  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
      role: "employee",
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      checkSubscriptionStatus();
    }
  }, [isOpen]);

  const checkSubscriptionStatus = async () => {
    setIsSubmitting(true);
    try {
      // Check current subscription status
      const { data, error } = await supabase.functions.invoke("check-subscription");
      
      if (error) {
        console.error("Error checking subscription:", error);
        setSubscriptionCheckFailed(true);
        return;
      }
      
      setSubscriptionData(data);
      
      // Check if we're at the employee seat limit
      if (data.admin_seats && data.employee_seats && data.total_members) {
        if (data.subscribed === false) {
          setSubscriptionCheckFailed(true);
        } else if (data.total_members > (data.admin_seats + data.employee_seats)) {
          setEmployeeLimit(true);
        }
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
      setSubscriptionCheckFailed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (data: InviteFormValues) => {
    setIsSubmitting(true);
    try {
      if (!organization) {
        toast({
          title: "Error",
          description: "No organization found for current user",
          variant: "destructive",
        });
        return;
      }

      if (subscriptionCheckFailed) {
        toast({
          title: "Subscription Required",
          description: "Please activate your subscription to add team members.",
          variant: "destructive",
        });
        return;
      }

      if (employeeLimit) {
        // Try to add a seat through Stripe
        const { data: updateData, error: updateError } = await supabase.functions
          .invoke("add-employee", {
            body: { action: "add" }
          });
        
        if (updateError) {
          toast({
            title: "Error",
            description: "Failed to update subscription. Please try again or contact support.",
            variant: "destructive",
          });
          return;
        }
      }

      // Create an invitation token
      const token = uuidv4();
      
      // Create an expiration date (24 hours from now)
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      // Save invitation to the database
      const { error } = await supabase
        .from("invitations")
        .insert([{
          organization_id: organization.id,
          email: data.email,
          role: data.role,
          token,
          expires_at: expiresAt.toISOString(),
        }]);

      if (error) {
        if (error.code === '23505') {
          // Unique constraint violation
          toast({
            title: "Error",
            description: "This user has already been invited",
            variant: "destructive",
          });
          return;
        }
        throw error;
      }

      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to ${data.email}`,
      });

      form.reset();
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error sending invitation:", error);
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to get pricing info based on role
  const getRolePricing = (role: string) => {
    return role === "admin" ? "$49/month" : "$10/month";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogDescription>
            Invite a new team member to your organization. Employee accounts cost $10/month each.
          </DialogDescription>
        </DialogHeader>
        
        {isSubmitting ? (
          <div className="flex justify-center items-center p-6">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Checking subscription status...</span>
          </div>
        ) : subscriptionCheckFailed ? (
          <Alert className="bg-amber-50 border-amber-200 text-amber-800">
            <AlertDescription>
              You need an active subscription to add team members.
              <div className="mt-2">
                <Button 
                  variant="outline" 
                  className="border-amber-400 text-amber-800 hover:bg-amber-100"
                  onClick={() => window.location.href = "/subscription"}
                >
                  Go to Subscription Page
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        ) : employeeLimit ? (
          <Alert className="bg-blue-50 border-blue-200 text-blue-800">
            <AlertDescription>
              Adding this user will increase your monthly subscription cost by $10/month.
            </AlertDescription>
          </Alert>
        ) : null}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="user@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Admin ({getRolePricing("admin")})</SelectItem>
                      <SelectItem value="employee">Employee ({getRolePricing("employee")})</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button 
                type="submit" 
                disabled={isSubmitting || subscriptionCheckFailed}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : "Send Invitation"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUserForm;
