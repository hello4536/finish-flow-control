import React from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import PricingSection from "@/components/landing/PricingSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Star, Zap, Shield } from "lucide-react";
const Pricing = () => {
  return <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section for Pricing Page */}
        <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Simple, Transparent Pricing
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Professional Finishing
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Management Platform
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
              $75/month base subscription + $25 per additional team member. Professional-grade tools for finishing operations.
            </p>
            
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 group">
              <Link to="/auth/signup" className="flex items-center">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Main Pricing Section */}
        <PricingSection />
        
        {/* FAQ Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about our pricing and plans.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">How does pricing work?</h3>
                  <p className="text-gray-600">Simple pricing: $75/month for the base subscription + $25/month for each additional team member.</p>
                </div>
                
                <div className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Can I change plans anytime?</h3>
                  <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
                </div>
                
                <div className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Is my data secure?</h3>
                  <p className="text-gray-600">Absolutely. We use enterprise-grade security and encryption to protect your data.</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">What payment methods do you accept?</h3>
                  <p className="text-gray-600">We accept all major credit cards and ACH transfers for annual plans.</p>
                </div>
                
                <div className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Do you offer refunds?</h3>
                  <p className="text-gray-600">Yes, we offer a 30-day money-back guarantee if you're not satisfied.</p>
                </div>
                
                <div className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Need a custom solution?</h3>
                  <p className="text-gray-600">Contact our sales team for enterprise pricing and custom integrations.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Finivo?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built specifically for finishing professionals by industry experts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Industry-Specific</h3>
                <p className="text-gray-600">Built specifically for finishing operations with features that matter to your business.</p>
              </div>
              
              <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Compliance Ready</h3>
                <p className="text-gray-600">Stay compliant with industry regulations through automated tracking and documentation.</p>
              </div>
              
              <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy to Use</h3>
                <p className="text-gray-600">Intuitive interface designed for busy professionals who need results fast.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Finishing Operations?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of finishing professionals who trust Finivo to streamline their operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                <Link to="/auth/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};
export default Pricing;