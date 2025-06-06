
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const UnsubscribePage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const unsubscribeUser = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('Invalid unsubscribe link. Please contact support if you need assistance.');
        return;
      }

      try {
        const response = await fetch(`/functions/v1/newsletter-unsubscribe?token=${token}`, {
          method: 'POST',
        });

        const result = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage('You have been successfully unsubscribed from our newsletter.');
          setEmail(result.email);
        } else {
          setStatus('error');
          setMessage(result.error || 'Failed to unsubscribe. Please try again.');
        }
      } catch (error) {
        console.error('Unsubscribe error:', error);
        setStatus('error');
        setMessage('An error occurred while processing your request. Please try again.');
      }
    };

    unsubscribeUser();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Newsletter Unsubscribe
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {status === 'loading' && (
            <div className="space-y-4">
              <Loader2 className="w-16 h-16 text-blue-500 mx-auto animate-spin" />
              <p className="text-gray-600">Processing your unsubscribe request...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900">Unsubscribed Successfully</h3>
              <p className="text-gray-600">{message}</p>
              {email && (
                <p className="text-sm text-gray-500">
                  Email: <strong>{email}</strong>
                </p>
              )}
              <div className="mt-6">
                <Button asChild>
                  <Link to="/">Return to Homepage</Link>
                </Button>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900">Unsubscribe Failed</h3>
              <p className="text-gray-600">{message}</p>
              <div className="mt-6 space-y-2">
                <Button asChild>
                  <Link to="/">Return to Homepage</Link>
                </Button>
                <p className="text-xs text-gray-500">
                  Need help? Contact us at support@finivo.com
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UnsubscribePage;
