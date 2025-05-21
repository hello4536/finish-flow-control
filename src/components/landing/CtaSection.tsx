
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User, MessageSquareQuote, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const testimonials = [{
  name: "John M.",
  position: "Finishing Department Manager",
  company: "Premier Cabinet Makers",
  quote: "Finivi has completely transformed how we manage our finishing operations. Material waste is down 30% and compliance issues have virtually disappeared.",
  avatar: null
}, {
  name: "Sarah L.",
  position: "Production Supervisor",
  company: "Custom Furniture Co.",
  quote: "The workflow tools in Finivi have streamlined our entire finishing process. My team can focus on quality work instead of paperwork.",
  avatar: null
}, {
  name: "Robert K.",
  position: "Operations Director",
  company: "Luxury Interiors",
  quote: "Since implementing Finivi, our regulatory compliance has improved dramatically. The dashboard gives me all the insights I need at a glance.",
  avatar: null
}];

const CtaSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-900 mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl font-bold md:text-4xl">
            Trusted by finishing professionals
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-[700px] mx-auto">
            See what our customers have to say about their experience with Finivi
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col h-full">
                <MessageSquareQuote className="text-blue-300 mb-4 h-8 w-8" />
                <p className="italic mb-6 flex-grow text-gray-700 text-lg">"{testimonial.quote}"</p>
                <div className="flex items-center mt-auto border-t pt-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-20 text-center bg-blue-50 rounded-2xl p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-indigo-100/50"></div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to transform your finishing operations?
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-[600px] mx-auto">
              Join thousands of finishing professionals who are experiencing the benefits of Finivi
            </p>
            <Button asChild size="lg" className="rounded-md bg-blue-900 hover:bg-blue-800">
              <Link to="/auth/signup">
                Start your free trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
