
import React from "react";
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
  
  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
      role: "employee",
    },
  });

  const onSubmit = async (data: InviteFormValues) => {
    try {
      if (!organization) {
        toast({
          title: "Error",
          description: "No organization found for current user",
          variant: "destructive",
        });
        return;
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
    }
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
                      <SelectItem value="admin">Admin ($49/month)</SelectItem>
                      <SelectItem value="employee">Employee ($10/month)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Send Invitation</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUserForm;
