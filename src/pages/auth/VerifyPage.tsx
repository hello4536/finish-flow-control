
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MailCheck } from "lucide-react";

const VerifyPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-2">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-3">
              <MailCheck className="h-10 w-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
          <CardDescription>
            We've sent you an email with a verification link. Please check your inbox to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            After verifying your email, you'll be directed to set up your payment information before accessing your account.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" asChild>
            <Link to="/auth/signin">Return to Sign In</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyPage;
