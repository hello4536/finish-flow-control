import React from "react";
import PlanCard from "@/components/subscription/PlanCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const PricingSection = () => {
  return <section id="pricing" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-[700px] mx-auto">
            Choose the plan that's right for your finishing department.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Admin Plan */}
          <PlanCard title="Admin Account" price={49} description="Full access for the first user in your organization" features={[{
          text: "Complete access to all features",
          included: true
        }, {
          text: "Add additional users at $10/month each",
          included: true
        }, {
          text: "Unlimited workflows",
          included: true
        }, {
          text: "Material tracking",
          included: true
        }, {
          text: "Custom creations library",
          included: true
        }, {
          text: "Compliance management",
          included: true
        }, {
          text: "Priority support",
          included: true
        }]} onSubscribe={() => window.location.href = '/auth/signup'} />
          
          {/* Employee Plan */}
          <PlanCard title="Employee Account" price={10} description="Per additional user in your organization" features={[{
          text: "Access to assigned workflows",
          included: true
        }, {
          text: "Task management",
          included: true
        }, {
          text: "Material usage tracking",
          included: true
        }, {
          text: "View reports and dashboards",
          included: true
        }, {
          text: "Access to shared recipes and creations",
          included: true
        }, {
          text: "Mobile app access",
          included: true
        }, {
          text: "Standard support",
          included: true
        }]} onSubscribe={() => window.location.href = '/auth/signup'} />
        </div>
        
        {/* FAQ */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b">
              
              <AccordionContent>
                Finivi doesn't currently offer a free trial. We recommend scheduling a demo to see how our platform can benefit your finishing department before purchasing.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border-b">
              <AccordionTrigger className="text-left font-semibold">Can I cancel my subscription anytime?</AccordionTrigger>
              <AccordionContent>
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing cycle.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border-b">
              <AccordionTrigger className="text-left font-semibold">Is my data secure?</AccordionTrigger>
              <AccordionContent>
                Finivi uses industry-standard security measures to protect your data. All information is encrypted and stored securely.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border-b">
              <AccordionTrigger className="text-left font-semibold">Do you offer custom implementation services?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer custom implementation services to help you get the most out of Finivi. Our team will work with you to configure the platform to meet your specific needs.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="border-b">
              <AccordionTrigger className="text-left font-semibold">What kind of support is included?</AccordionTrigger>
              <AccordionContent>
                All plans include standard email support. Admin accounts also include priority support with faster response times and access to phone support during business hours.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6" className="border-b">
              <AccordionTrigger className="text-left font-semibold">How does your billing work?</AccordionTrigger>
              <AccordionContent>
                We offer monthly and annual billing options. Annual billing comes with a 10% discount compared to monthly billing. We accept all major credit cards and can provide invoices for enterprise customers.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-7" className="border-b">
              <AccordionTrigger className="text-left font-semibold">Do you offer discounts for non-profits or educational institutions?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer special pricing for non-profit organizations and educational institutions. Please contact our sales team for more information.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-8" className="border-b">
              <AccordionTrigger className="text-left font-semibold">Can I export my data if I decide to cancel?</AccordionTrigger>
              <AccordionContent>
                Yes, Finivi allows you to export all your data in standard formats (CSV, JSON) at any time, including after you've decided to cancel your subscription.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-9" className="border-b">
              <AccordionTrigger className="text-left font-semibold">What industries is Finivi best suited for?</AccordionTrigger>
              <AccordionContent>
                Finivi is designed specifically for finishing departments across multiple industries, including woodworking, auto body shops, painting contractors, furniture manufacturing, and metal finishing operations. Our platform is flexible enough to adapt to the specific needs of each industry.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-10" className="border-b">
              <AccordionTrigger className="text-left font-semibold">Can I use Finivi on mobile devices?</AccordionTrigger>
              <AccordionContent>
                Yes, Finivi is fully responsive and works on all mobile devices. We also offer dedicated mobile apps for iOS and Android that provide optimized experiences for team members working on the shop floor.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-11" className="border-b">
              <AccordionTrigger className="text-left font-semibold">Is there a limit to how many workflows I can create?</AccordionTrigger>
              <AccordionContent>
                No, all subscription plans include unlimited workflows. You can create as many custom finishing processes as you need to manage your operations efficiently.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-12" className="border-b">
              <AccordionTrigger className="text-left font-semibold">Do you integrate with other business systems?</AccordionTrigger>
              <AccordionContent>
                Finivi offers integrations with popular business management systems, accounting software, and CRMs. We provide API access for custom integrations on all paid plans. Our team can help you set up integrations with your existing systems.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-13" className="border-b">
              <AccordionTrigger className="text-left font-semibold">How long does implementation typically take?</AccordionTrigger>
              <AccordionContent>
                For most finishing departments, you can be up and running with Finivi in 1-2 weeks. This includes initial setup, data import, workflow creation, and team training. For larger operations or those requiring custom integrations, implementation may take 3-4 weeks.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-14" className="border-b">
              <AccordionTrigger className="text-left font-semibold">How often do you release updates?</AccordionTrigger>
              <AccordionContent>
                We release minor updates and improvements every 2-4 weeks. Major feature releases typically occur quarterly. All updates are automatic and don't require any action on your part. We provide detailed release notes for each update.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>;
};
export default PricingSection;