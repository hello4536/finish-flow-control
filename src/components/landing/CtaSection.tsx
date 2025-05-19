import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User, MessageSquareQuote } from "lucide-react";
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
  return <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-[700px] mx-auto">
            Join hundreds of finishing professionals who are already experiencing the benefits of Finivi
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => <Card key={index} className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col h-full">
                <MessageSquareQuote className="text-accent mb-4 h-8 w-8" />
                <p className="text-muted-foreground italic mb-6 flex-grow">"{testimonial.quote}"</p>
                <div className="flex items-center mt-auto">
                  <div className="bg-primary/10 rounded-full p-2 mr-3">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>
        
        
      </div>
    </section>;
};
export default CtaSection;