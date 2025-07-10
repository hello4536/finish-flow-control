import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquareQuote, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const testimonials = [{
  name: "John M.",
  position: "Finishing Department Manager",
  company: "Premier Cabinet Makers",
  quote: "Finivo has completely transformed how we manage our finishing operations. Material waste is down 30% and compliance issues have virtually disappeared.",
  avatar: null
}, {
  name: "Sarah L.",
  position: "Production Supervisor",
  company: "Custom Furniture Co.",
  quote: "The workflow tools in Finivo have streamlined our entire finishing process. My team can focus on quality work instead of paperwork.",
  avatar: null
}, {
  name: "Robert K.",
  position: "Operations Director",
  company: "Luxury Interiors",
  quote: "Since implementing Finivo, our regulatory compliance has improved dramatically. The dashboard gives me all the insights I need at a glance.",
  avatar: null
}];
const CtaSection = () => {
  return <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100/40 to-teal-100/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 text-blue-700 text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            Customer Success Stories
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900">Trusted by finishing</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              professionals everywhere
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See what our customers have to say about their experience with Finivo and how it's transformed their operations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => <Card key={index} className="border-2 border-gray-100 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:border-blue-200 relative overflow-hidden group">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/50 group-hover:to-purple-50/30 transition-all duration-300"></div>
              
              <CardContent className="p-8 flex flex-col h-full relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <MessageSquareQuote className="text-blue-500 h-8 w-8" />
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                </div>
                
                <blockquote className="italic mb-8 flex-grow text-gray-700 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center mt-auto border-t border-gray-100 pt-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900 text-lg">{testimonial.name}</p>
                    <p className="text-sm text-gray-600 font-medium">{testimonial.position}</p>
                    <p className="text-xs text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>
        
        {/* Call to Action */}
        
      </div>
    </section>;
};
export default CtaSection;