import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { MessageSquareQuote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const SwipeableTestimonials = () => {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!isMobile) return null;

  const testimonials = [
    {
      name: "John M.",
      position: "Finishing Department Manager",
      company: "Premier Cabinet Makers",
      quote: "Finivo has completely transformed how we manage our finishing operations. Material waste is down 30% and compliance issues have virtually disappeared.",
      rating: 5
    },
    {
      name: "Sarah L.",
      position: "Production Supervisor", 
      company: "Custom Furniture Co.",
      quote: "The workflow tools in Finivo have streamlined our entire finishing process. My team can focus on quality work instead of paperwork.",
      rating: 5
    },
    {
      name: "Robert K.",
      position: "Operations Director",
      company: "Luxury Interiors",
      quote: "Since implementing Finivo, our regulatory compliance has improved dramatically. The dashboard gives me all the insights I need at a glance.",
      rating: 5
    }
  ];

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (containerRef.current) {
      const slideWidth = containerRef.current.clientWidth;
      containerRef.current.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
    }
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % testimonials.length;
    goToSlide(newIndex);
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 text-blue-700 text-xs font-medium mb-4">
            <Star className="w-3 h-3 mr-1" />
            Customer Success Stories
          </div>
          
          <h2 className="text-2xl font-bold mb-4">
            <span className="text-gray-900">Trusted by finishing</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              professionals everywhere
            </span>
          </h2>
        </div>

        {/* Swipeable testimonials container */}
        <div className="relative">
          <div
            ref={containerRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 snap-center px-2"
              >
                <Card className="border-2 border-gray-100 bg-white shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <MessageSquareQuote className="text-blue-500 h-6 w-6" />
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    
                    <blockquote className="italic mb-6 text-gray-700 text-sm leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center border-t border-gray-100 pt-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                        <p className="text-xs text-gray-600 font-medium">{testimonial.position}</p>
                        <p className="text-xs text-gray-500">{testimonial.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center space-x-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                currentIndex === index
                  ? 'bg-blue-600 w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SwipeableTestimonials;