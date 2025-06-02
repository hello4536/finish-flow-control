
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LinksSection from '@/components/resources/LinksSection';
import DocumentsSection from '@/components/resources/DocumentsSection';
import NotesSection from '@/components/resources/NotesSection';
import VendorsSection from '@/components/resources/VendorsSection';
import ReceiptsSection from '@/components/resources/ReceiptsSection';
import ReimbursementsSection from '@/components/resources/ReimbursementsSection';

const Resources = () => {
  // Resource counts for badges
  const [counts, setCounts] = useState({
    links: 0,
    documents: 0,
    notes: 0,
    vendors: 0,
    receipts: 0,
    reimbursements: 0
  });

  // Update counts when resources change
  const updateCounts = (type: 'links' | 'documents' | 'notes' | 'vendors' | 'receipts' | 'reimbursements', count: number) => {
    setCounts(prev => ({
      ...prev,
      [type]: count
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Resources
          </h1>
          <p className="text-slate-600 mt-2 font-medium">
            Save and organize your important resources in one place
          </p>
        </div>

        <Tabs defaultValue="links" className="w-full">
          <TabsList className="grid grid-cols-6 w-full max-w-4xl bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg rounded-2xl p-2">
            <TabsTrigger value="links" className="relative rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg">
              Links
              {counts.links > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  {counts.links}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="documents" className="relative rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg">
              Documents
              {counts.documents > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  {counts.documents}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="notes" className="relative rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg">
              Notes
              {counts.notes > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  {counts.notes}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="vendors" className="relative rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-500 data-[state=active]:text-white data-[state=active]:shadow-lg">
              Vendors
              {counts.vendors > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  {counts.vendors}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="receipts" className="relative rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-rose-500 data-[state=active]:text-white data-[state=active]:shadow-lg">
              Receipts
              {counts.receipts > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  {counts.receipts}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="reimbursements" className="relative rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg">
              Reimbursements
              {counts.reimbursements > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  {counts.reimbursements}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="links" className="mt-6">
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Links</CardTitle>
                <CardDescription className="text-slate-600 font-medium">Save important URLs and website links</CardDescription>
              </CardHeader>
              <CardContent>
                <LinksSection onCountChange={(count) => updateCounts('links', count)} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="mt-6">
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-green-50/30 to-emerald-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Documents</CardTitle>
                <CardDescription className="text-slate-600 font-medium">Upload and organize important files</CardDescription>
              </CardHeader>
              <CardContent>
                <DocumentsSection onCountChange={(count) => updateCounts('documents', count)} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notes" className="mt-6">
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-amber-50/30 to-orange-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Notes</CardTitle>
                <CardDescription className="text-slate-600 font-medium">Keep track of important information</CardDescription>
              </CardHeader>
              <CardContent>
                <NotesSection onCountChange={(count) => updateCounts('notes', count)} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="vendors" className="mt-6">
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-purple-50/30 to-violet-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">Vendors</CardTitle>
                <CardDescription className="text-slate-600 font-medium">Manage your supplier and vendor contact information</CardDescription>
              </CardHeader>
              <CardContent>
                <VendorsSection onCountChange={(count) => updateCounts('vendors', count)} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="receipts" className="mt-6">
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-red-50/30 to-rose-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Receipts</CardTitle>
                <CardDescription className="text-slate-600 font-medium">Upload and categorize your digital receipts</CardDescription>
              </CardHeader>
              <CardContent>
                <ReceiptsSection onCountChange={(count) => updateCounts('receipts', count)} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reimbursements" className="mt-6">
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-indigo-50/30 to-purple-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Reimbursements</CardTitle>
                <CardDescription className="text-slate-600 font-medium">Track and manage employee reimbursement requests</CardDescription>
              </CardHeader>
              <CardContent>
                <ReimbursementsSection onCountChange={(count) => updateCounts('reimbursements', count)} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Resources;
