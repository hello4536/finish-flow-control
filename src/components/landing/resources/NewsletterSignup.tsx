
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [finisherType, setFinisherType] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !finisherType) {
      toast({
        title: "Missing Information",
        description: "Please provide your email and select your finisher type.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      toast({
        title: "Successfully Subscribed!",
        description: `Welcome to our newsletter! You'll receive ${finisherType} finishing tips and insights.`,
      });
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Finivo!</h3>
            <p className="text-gray-600 mb-4">
              You're now subscribed to receive expert {finisherType} finishing tips, tutorials, and industry insights.
            </p>
            <p className="text-sm text-gray-500">
              Check your email for a confirmation message.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4 mx-auto">
          <Mail className="w-6 h-6 text-blue-600" />
        </div>
        <CardTitle className="text-2xl font-bold">
          Join the Finivo Newsletter
        </CardTitle>
        <CardDescription className="text-lg">
          Get expert finishing tips, industry insights, and exclusive tutorials delivered to your inbox weekly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
            />
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium">
              What type of finisher are you?
            </Label>
            <RadioGroup value={finisherType} onValueChange={setFinisherType} className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="woodworking" id="woodworking" />
                <Label htmlFor="woodworking" className="flex-1 cursor-pointer">
                  <div className="font-medium">Woodworking & Millwork</div>
                  <div className="text-sm text-gray-500">Furniture, cabinetry, architectural millwork</div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="autobody" id="autobody" />
                <Label htmlFor="autobody" className="flex-1 cursor-pointer">
                  <div className="font-medium">Auto Body Finishing</div>
                  <div className="text-sm text-gray-500">Vehicle painting, bodywork, restoration</div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="both" id="both" />
                <Label htmlFor="both" className="flex-1 cursor-pointer">
                  <div className="font-medium">Both Industries</div>
                  <div className="text-sm text-gray-500">I work with both woodworking and auto body finishing</div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 text-lg"
            disabled={isLoading}
          >
            {isLoading ? "Subscribing..." : "Subscribe to Newsletter"}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By subscribing, you agree to receive marketing emails from Finivo. You can unsubscribe at any time.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewsletterSignup;
