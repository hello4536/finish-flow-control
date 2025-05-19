
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="text-xl font-bold">Finish Manager</div>
          <div className="flex items-center gap-4">
            <Link to="/auth/signin" className="text-sm font-medium hover:underline">
              Sign In
            </Link>
            <Button asChild>
              <Link to="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <Badge className="rounded-md px-3 py-1 text-sm" variant="secondary">
                Introducing Finish Manager
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Streamline Your Finishing Operations
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Manage workflows, materials, inventory, compliance, and more with our all-in-one platform for finishing operations.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg" className="h-12 px-6">
                  <Link to="/auth/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-6">
                  <Link to="/auth/signin">
                    Sign In
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Pricing</h2>
                <p className="text-muted-foreground">
                  Simple, transparent pricing for organizations of all sizes.
                </p>
              </div>
              <div className="grid gap-6">
                <div className="rounded-lg border bg-card p-6">
                  <div className="mb-4 flex flex-col gap-2">
                    <h3 className="font-bold">Admin Account</h3>
                    <p className="text-3xl font-bold">$49/month</p>
                    <p className="text-muted-foreground">
                      Full access for the first user in your organization.
                    </p>
                  </div>
                  <ul className="mb-6 space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-foreground"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Complete access to all features
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-foreground"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Add additional users at $10/month each
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-foreground"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Priority support
                    </li>
                  </ul>
                  <Button asChild className="w-full">
                    <Link to="/auth/signup">Sign Up Now</Link>
                  </Button>
                </div>
                <div className="rounded-lg border bg-card p-6">
                  <div className="mb-4 flex flex-col gap-2">
                    <h3 className="font-bold">Employee Account</h3>
                    <p className="text-3xl font-bold">$10/month</p>
                    <p className="text-muted-foreground">
                      Per additional user in your organization.
                    </p>
                  </div>
                  <ul className="mb-6 space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-foreground"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Access to assigned workflows
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-foreground"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Task management
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-foreground"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      View reports and dashboards
                    </li>
                  </ul>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/auth/signin">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Finish Manager. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
