import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Download, ArrowRight, CheckCircle2, DollarSign } from "lucide-react";

const LeadCapture = () => {
  const [email, setEmail] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleROICalculation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsCalculating(true);
    
    // Simulate calculation
    setTimeout(() => {
      setIsCalculating(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200/50 text-green-700 text-sm font-medium mb-6">
              <Calculator className="w-4 h-4 mr-2" />
              ROI Calculator
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gray-900">Calculate your potential</span>
              <br />
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                annual savings with Finivo
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              See exactly how much money Finivo can save your finishing operation. 
              Get a personalized ROI report in under 2 minutes.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* ROI Calculator Form */}
            <Card className="border-2 border-green-200 shadow-xl">
              <CardContent className="p-8">
                {!showResults ? (
                  <>
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <DollarSign className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Free ROI Analysis</h3>
                      <p className="text-gray-600">Get your personalized savings report</p>
                    </div>

                    <form onSubmit={handleROICalculation} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your work email
                        </label>
                        <Input
                          type="email"
                          placeholder="manager@yourcompany.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Jobs per month
                          </label>
                          <Input type="number" placeholder="50" defaultValue="50" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Avg job value
                          </label>
                          <Input type="number" placeholder="2500" defaultValue="2500" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current paint waste %
                        </label>
                        <Input type="number" placeholder="15" defaultValue="15" />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isCalculating}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full py-3 text-lg font-semibold"
                      >
                        {isCalculating ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                            Calculating...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            Calculate My Savings
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </div>
                        )}
                      </Button>

                      <div className="text-center text-sm text-gray-500">
                        <div className="flex items-center justify-center space-x-4">
                          <span>✓ No spam</span>
                          <span>✓ Instant results</span>
                          <span>✓ Free consultation included</span>
                        </div>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">ROI Report Sent!</h3>
                      <p className="text-gray-600">Check your email for your personalized savings analysis</p>
                    </div>

                    <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-1">$42,500</div>
                        <p className="text-green-700 font-medium">Estimated Annual Savings</p>
                        <div className="text-sm text-green-600 mt-2">
                          Based on 40% waste reduction + improved efficiency
                        </div>
                      </div>
                    </div>

                    <Button asChild size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full">
                      <a href="/auth/signup" className="flex items-center justify-center">
                        Start Free Trial
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Benefits Preview */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What you'll get:</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calculator className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Personalized ROI Report</h4>
                      <p className="text-gray-600">Detailed analysis of your potential savings with Finivo</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Download className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Finishing Efficiency Guide</h4>
                      <p className="text-gray-600">Free 20-page guide with industry best practices</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Free Consultation</h4>
                      <p className="text-gray-600">30-minute call with a finishing operations expert</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-3">Typical Finivo Customer Results:</h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">40%</div>
                    <div className="text-sm text-gray-600">Material waste reduction</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">35%</div>
                    <div className="text-sm text-gray-600">Faster job completion</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">100%</div>
                    <div className="text-sm text-gray-600">Compliance accuracy</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">$50K+</div>
                    <div className="text-sm text-gray-600">Average annual savings</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCapture;