
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClipboardCheck, Shield, FileCheck, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Quality = () => {
  const [search, setSearch] = useState("");
  
  const inspections = [
    { id: "INS-001", date: "2025-05-12", product: "Aluminum Frame A-100", inspector: "John Doe", status: "Passed", notes: "All specifications met" },
    { id: "INS-002", date: "2025-05-11", product: "Steel Beam S-200", inspector: "Jane Smith", status: "Failed", notes: "Dimensional inconsistency" },
    { id: "INS-003", date: "2025-05-10", product: "Glass Panel G-300", inspector: "Mike Johnson", status: "Passed", notes: "Clarity test passed" },
    { id: "INS-004", date: "2025-05-09", product: "Plastic Casing P-400", inspector: "Sarah Williams", status: "Pending", notes: "Awaiting final inspection" },
    { id: "INS-005", date: "2025-05-08", product: "Copper Wire C-500", inspector: "David Brown", status: "Passed", notes: "Conductivity within parameters" },
  ];
  
  const certifications = [
    { id: "CERT-001", name: "ISO 9001", status: "Active", expiry: "2026-01-15", authority: "International Standards Organization" },
    { id: "CERT-002", name: "CE Mark", status: "Active", expiry: "2025-12-10", authority: "European Commission" },
    { id: "CERT-003", name: "UL Certification", status: "Expiring Soon", expiry: "2025-06-30", authority: "Underwriters Laboratories" },
    { id: "CERT-004", name: "ASTM Compliance", status: "Active", expiry: "2027-03-22", authority: "American Society for Testing and Materials" },
    { id: "CERT-005", name: "RoHS Compliance", status: "Active", expiry: "2026-09-18", authority: "European Union" },
  ];
  
  const violations = [
    { id: "VIO-001", date: "2025-04-15", type: "Safety Protocol", description: "Inadequate machine guarding", status: "Resolved", assignee: "Operations Team" },
    { id: "VIO-002", date: "2025-04-02", type: "Environmental", description: "Improper waste disposal", status: "In Progress", assignee: "Facilities Management" },
    { id: "VIO-003", date: "2025-03-28", type: "Quality Control", description: "Documentation incomplete", status: "Resolved", assignee: "QC Department" },
    { id: "VIO-004", date: "2025-03-10", type: "Regulatory", description: "Missing hazard labels", status: "Pending Review", assignee: "Compliance Officer" },
    { id: "VIO-005", date: "2025-02-22", type: "Procedural", description: "Skipped inspection step", status: "Resolved", assignee: "Production Team" },
  ];
  
  const handleExport = (dataType: string) => {
    toast({
      title: "Export Initiated",
      description: `${dataType} data is being prepared for export.`,
    });
  };
  
  const handleView = (id: string, type: string) => {
    toast({
      title: `Viewing ${type} Details`,
      description: `Opening detailed view for ${id}`,
    });
  };
  
  const filteredInspections = inspections.filter(
    (item) => 
      item.id.toLowerCase().includes(search.toLowerCase()) || 
      item.product.toLowerCase().includes(search.toLowerCase()) ||
      item.inspector.toLowerCase().includes(search.toLowerCase())
  );
  
  const filteredCertifications = certifications.filter(
    (item) => 
      item.id.toLowerCase().includes(search.toLowerCase()) || 
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.authority.toLowerCase().includes(search.toLowerCase())
  );
  
  const filteredViolations = violations.filter(
    (item) => 
      item.id.toLowerCase().includes(search.toLowerCase()) || 
      item.type.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.assignee.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quality Control & Compliance</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-6 w-6" />
              <CardTitle>Quality Inspections</CardTitle>
            </div>
            <CardDescription className="text-blue-100">
              Recent product quality checks
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{inspections.length}</div>
            <p className="text-muted-foreground">Total inspections this month</p>
            <div className="mt-2 flex gap-2">
              <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                {inspections.filter(i => i.status === "Passed").length} Passed
              </div>
              <div className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                {inspections.filter(i => i.status === "Failed").length} Failed
              </div>
              <div className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                {inspections.filter(i => i.status === "Pending").length} Pending
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              <CardTitle>Certifications</CardTitle>
            </div>
            <CardDescription className="text-indigo-100">
              Active compliance certifications
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{certifications.length}</div>
            <p className="text-muted-foreground">Active certifications</p>
            <div className="mt-2">
              <div className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 inline-block">
                {certifications.filter(c => c.status === "Expiring Soon").length} Expiring soon
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <FileCheck className="h-6 w-6" />
              <CardTitle>Compliance Issues</CardTitle>
            </div>
            <CardDescription className="text-red-100">
              Regulatory violations and fixes
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{violations.length}</div>
            <p className="text-muted-foreground">Total violations reported</p>
            <div className="mt-2 flex gap-2">
              <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                {violations.filter(v => v.status === "Resolved").length} Resolved
              </div>
              <div className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                {violations.filter(v => v.status === "In Progress").length} In progress
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Tabs defaultValue="inspections" className="w-full">
            <TabsList className="w-full justify-start rounded-b-none rounded-t-lg border-b p-0">
              <TabsTrigger value="inspections" className="rounded-t-lg rounded-b-none py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                Quality Inspections
              </TabsTrigger>
              <TabsTrigger value="certifications" className="rounded-t-lg rounded-b-none py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                Certifications
              </TabsTrigger>
              <TabsTrigger value="violations" className="rounded-t-lg rounded-b-none py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                Compliance Issues
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="inspections" className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Recent Quality Inspections</h3>
                <Button onClick={() => handleExport("Inspection")} variant="outline">Export Data</Button>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Inspector</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInspections.length > 0 ? (
                      filteredInspections.map((inspection) => (
                        <TableRow key={inspection.id}>
                          <TableCell className="font-medium">{inspection.id}</TableCell>
                          <TableCell>{inspection.date}</TableCell>
                          <TableCell>{inspection.product}</TableCell>
                          <TableCell>{inspection.inspector}</TableCell>
                          <TableCell>
                            <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                              ${inspection.status === "Passed" ? "bg-green-100 text-green-800" : 
                                inspection.status === "Failed" ? "bg-red-100 text-red-800" : 
                                "bg-yellow-100 text-yellow-800"
                              }`}>
                              {inspection.status}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => handleView(inspection.id, "Inspection")}>
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                          No inspection records found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="certifications" className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Active Certifications</h3>
                <Button onClick={() => handleExport("Certification")} variant="outline">Export Data</Button>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Certification</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Issuing Authority</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCertifications.length > 0 ? (
                      filteredCertifications.map((cert) => (
                        <TableRow key={cert.id}>
                          <TableCell className="font-medium">{cert.id}</TableCell>
                          <TableCell>{cert.name}</TableCell>
                          <TableCell>
                            <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                              ${cert.status === "Active" ? "bg-green-100 text-green-800" : 
                                "bg-yellow-100 text-yellow-800"
                              }`}>
                              {cert.status}
                            </div>
                          </TableCell>
                          <TableCell>{cert.expiry}</TableCell>
                          <TableCell>{cert.authority}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => handleView(cert.id, "Certification")}>
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                          No certification records found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="violations" className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Compliance Issues</h3>
                <Button onClick={() => handleExport("Violation")} variant="outline">Export Data</Button>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assignee</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredViolations.length > 0 ? (
                      filteredViolations.map((violation) => (
                        <TableRow key={violation.id}>
                          <TableCell className="font-medium">{violation.id}</TableCell>
                          <TableCell>{violation.date}</TableCell>
                          <TableCell>{violation.type}</TableCell>
                          <TableCell>{violation.description}</TableCell>
                          <TableCell>
                            <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                              ${violation.status === "Resolved" ? "bg-green-100 text-green-800" : 
                                violation.status === "In Progress" ? "bg-blue-100 text-blue-800" : 
                                "bg-yellow-100 text-yellow-800"
                              }`}>
                              {violation.status}
                            </div>
                          </TableCell>
                          <TableCell>{violation.assignee}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => handleView(violation.id, "Violation")}>
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                          No compliance issues found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Quality;
