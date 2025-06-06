
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface NewsletterSubscription {
  email: string;
  finisherType: 'woodworking' | 'autobody' | 'both';
}

export const useNewsletter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const subscribe = async (data: NewsletterSubscription) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/functions/v1/newsletter-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          finisherType: data.finisherType,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Subscription failed');
      }

      toast({
        title: "Successfully Subscribed!",
        description: `Welcome to our newsletter! You'll receive ${data.finisherType} finishing tips and insights.`,
      });

      return { success: true, data: result.subscriber };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Please try again later.";
      
      toast({
        title: "Subscription Failed",
        description: errorMessage,
        variant: "destructive"
      });

      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribe = async (token: string) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`/functions/v1/newsletter-unsubscribe?token=${token}`, {
        method: 'POST',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unsubscribe failed');
      }

      return { success: true, data: result };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unsubscribe failed";
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    subscribe,
    unsubscribe,
    isLoading
  };
};
