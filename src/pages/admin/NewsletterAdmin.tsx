
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Users, Mail, Send, Eye } from "lucide-react";

interface Subscriber {
  id: string;
  email: string;
  subscription_type: string;
  status: string;
  created_at: string;
}

interface Newsletter {
  id: string;
  title: string;
  subject: string;
  content: string;
  newsletter_type: string;
  status: string;
  created_at: string;
  sent_at?: string;
}

const NewsletterAdmin = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNewsletter, setNewNewsletter] = useState({
    title: '',
    subject: '',
    content: '',
    newsletter_type: 'general'
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [subscribersData, newslettersData] = await Promise.all([
        supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false }),
        supabase.from('newsletters').select('*').order('created_at', { ascending: false })
      ]);

      if (subscribersData.data) setSubscribers(subscribersData.data);
      if (newslettersData.data) setNewsletters(newslettersData.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createNewsletter = async () => {
    if (!newNewsletter.title || !newNewsletter.subject || !newNewsletter.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('newsletters')
        .insert({
          ...newNewsletter,
          status: 'draft'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Newsletter created successfully"
      });

      setNewNewsletter({
        title: '',
        subject: '',
        content: '',
        newsletter_type: 'general'
      });

      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create newsletter",
        variant: "destructive"
      });
    }
  };

  const getSubscriberStats = () => {
    const total = subscribers.length;
    const confirmed = subscribers.filter(s => s.status === 'confirmed').length;
    const woodworking = subscribers.filter(s => s.subscription_type === 'woodworking').length;
    const autobody = subscribers.filter(s => s.subscription_type === 'autobody').length;
    const both = subscribers.filter(s => s.subscription_type === 'both').length;

    return { total, confirmed, woodworking, autobody, both };
  };

  const stats = getSubscriberStats();

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Newsletter Administration</h1>
        <p className="text-gray-600">Manage subscribers and create newsletters</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold">{stats.confirmed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Woodworking</p>
              <p className="text-2xl font-bold">{stats.woodworking}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Auto Body</p>
              <p className="text-2xl font-bold">{stats.autobody}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Both</p>
              <p className="text-2xl font-bold">{stats.both}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subscribers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          <TabsTrigger value="newsletters">Newsletters</TabsTrigger>
          <TabsTrigger value="create">Create Newsletter</TabsTrigger>
        </TabsList>

        <TabsContent value="subscribers">
          <Card>
            <CardHeader>
              <CardTitle>Subscribers List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscribers.map((subscriber) => (
                  <div key={subscriber.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{subscriber.email}</p>
                      <p className="text-sm text-gray-600">
                        Subscribed: {new Date(subscriber.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={subscriber.status === 'confirmed' ? 'default' : 'secondary'}>
                        {subscriber.status}
                      </Badge>
                      <Badge variant="outline">
                        {subscriber.subscription_type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="newsletters">
          <Card>
            <CardHeader>
              <CardTitle>Newsletters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {newsletters.map((newsletter) => (
                  <div key={newsletter.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{newsletter.title}</h3>
                      <Badge variant={newsletter.status === 'sent' ? 'default' : 'secondary'}>
                        {newsletter.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{newsletter.subject}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Type: {newsletter.newsletter_type}</span>
                      <span>Created: {new Date(newsletter.created_at).toLocaleDateString()}</span>
                      {newsletter.sent_at && (
                        <span>Sent: {new Date(newsletter.sent_at).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Newsletter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newNewsletter.title}
                  onChange={(e) => setNewNewsletter({...newNewsletter, title: e.target.value})}
                  placeholder="Newsletter title"
                />
              </div>

              <div>
                <Label htmlFor="subject">Email Subject</Label>
                <Input
                  id="subject"
                  value={newNewsletter.subject}
                  onChange={(e) => setNewNewsletter({...newNewsletter, subject: e.target.value})}
                  placeholder="Email subject line"
                />
              </div>

              <div>
                <Label htmlFor="type">Newsletter Type</Label>
                <Select 
                  value={newNewsletter.newsletter_type} 
                  onValueChange={(value) => setNewNewsletter({...newNewsletter, newsletter_type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select newsletter type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="woodworking">Woodworking</SelectItem>
                    <SelectItem value="autobody">Auto Body</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newNewsletter.content}
                  onChange={(e) => setNewNewsletter({...newNewsletter, content: e.target.value})}
                  placeholder="Newsletter content (HTML supported)"
                  rows={10}
                />
              </div>

              <Button onClick={createNewsletter} className="w-full">
                Create Newsletter
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NewsletterAdmin;
