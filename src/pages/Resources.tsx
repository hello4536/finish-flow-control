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
  return <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-purple-600">Resources</h1>
        <p className="text-muted-foreground mt-1">
          Save and organize your important resources in one place
        </p>
      </div>

      <Tabs defaultValue="links" className="w-full">
        <TabsList className="grid grid-cols-6 w-full max-w-3xl rounded-md bg-zinc-50">
          <TabsTrigger value="links" className="relative rounded-lg bg-slate-50">
            Links
            {counts.links > 0 && <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {counts.links}
              </span>}
          </TabsTrigger>
          <TabsTrigger value="documents" className="relative">
            Documents
            {counts.documents > 0 && <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {counts.documents}
              </span>}
          </TabsTrigger>
          <TabsTrigger value="notes" className="relative">
            Notes
            {counts.notes > 0 && <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {counts.notes}
              </span>}
          </TabsTrigger>
          <TabsTrigger value="vendors" className="relative">
            Vendors
            {counts.vendors > 0 && <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {counts.vendors}
              </span>}
          </TabsTrigger>
          <TabsTrigger value="receipts" className="relative">
            Receipts
            {counts.receipts > 0 && <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {counts.receipts}
              </span>}
          </TabsTrigger>
          <TabsTrigger value="reimbursements" className="relative">
            Reimburse
            {counts.reimbursements > 0 && <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {counts.reimbursements}
              </span>}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="links" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Links</CardTitle>
              <CardDescription>Save important URLs and website links</CardDescription>
            </CardHeader>
            <CardContent>
              <LinksSection onCountChange={count => updateCounts('links', count)} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Documents</CardTitle>
              <CardDescription>Upload and organize important files</CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentsSection onCountChange={count => updateCounts('documents', count)} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Notes</CardTitle>
              <CardDescription>Keep track of important information</CardDescription>
            </CardHeader>
            <CardContent>
              <NotesSection onCountChange={count => updateCounts('notes', count)} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="vendors" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Vendors</CardTitle>
              <CardDescription>Manage your supplier and vendor contact information</CardDescription>
            </CardHeader>
            <CardContent>
              <VendorsSection onCountChange={count => updateCounts('vendors', count)} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="receipts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Receipts</CardTitle>
              <CardDescription>Upload and categorize your digital receipts</CardDescription>
            </CardHeader>
            <CardContent>
              <ReceiptsSection onCountChange={count => updateCounts('receipts', count)} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reimbursements" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Reimbursements</CardTitle>
              <CardDescription>Track and manage employee reimbursement requests</CardDescription>
            </CardHeader>
            <CardContent>
              <ReimbursementsSection onCountChange={count => updateCounts('reimbursements', count)} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
};
export default Resources;