"use client";
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import apiClient from '@/lib/api';

interface ApiStatus {
  status: 'healthy' | 'unhealthy' | 'checking' | 'unknown';
  message: string;
  timestamp?: string;
}

export function ApiHealthCheck() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>({
    status: 'checking',
    message: 'Checking API connection...',
  });

  const checkApiHealth = async () => {
    setApiStatus({
      status: 'checking',
      message: 'Checking API connection...',
    });

    try {
      const response = await apiClient.healthCheck();
      if (response.success && response.data) {
        setApiStatus({
          status: 'healthy',
          message: 'API server is running properly',
          timestamp: response.data.timestamp,
        });
      } else {
        setApiStatus({
          status: 'unhealthy',
          message: response.error || 'API health check failed',
        });
      }
    } catch (error) {
      console.error('API health check failed', error);
      setApiStatus({
        status: 'unhealthy',
        message: 'Cannot connect to API server at http://localhost:6060/api',
      });
    }
  };

  useEffect(() => {
    checkApiHealth();
  }, []);

  const getStatusIcon = () => {
    switch (apiStatus.status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'unhealthy':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'checking':
        return <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusBadge = () => {
    switch (apiStatus.status) {
      case 'healthy':
        return <Badge className="bg-green-100 text-green-800">Connected</Badge>;
      case 'unhealthy':
        return <Badge variant="destructive">Disconnected</Badge>;
      case 'checking':
        return <Badge variant="secondary">Checking...</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">API Status</span>
              {getStatusBadge()}
            </div>
            <p className="text-sm text-gray-600">{apiStatus.message}</p>
            {apiStatus.timestamp && (
              <p className="text-xs text-gray-500">
                Last checked: {new Date(apiStatus.timestamp).toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={checkApiHealth}
          disabled={apiStatus.status === 'checking'}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${apiStatus.status === 'checking' ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
    </Card>
  );
}