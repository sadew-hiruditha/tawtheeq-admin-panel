// Custom React hooks for API calls
"use client";
import { useState, useEffect } from 'react';
import apiClient, { DashboardStats, User, ApiResponse } from '@/lib/api';

// Specific hooks for common API calls
export function useDashboardStats() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.getDashboardStats();
        if (response.success && response.data) {
          setData(response.data);
        } else {
          setError(response.error || 'Failed to fetch dashboard stats');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useUsers() {
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.getUsers();
        if (response.success && response.data) {
          setData(response.data);
        } else {
          setError(response.error || 'Failed to fetch users');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useUser(userId: string) {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    
    const fetchData = async () => {
      try {
        console.log(`useUser hook: Fetching user ${userId}`);
        setLoading(true);
        setError(null);
        const response = await apiClient.getUser(userId);
        console.log(`useUser hook: Full response for ${userId}:`, response);
        
        if (response.success && response.data) {
          console.log(`useUser hook: Setting user data:`, response.data);
          setData(response.data);
        } else {
          console.error(`useUser hook: Failed to load user ${userId}:`, response.error);
          setError(response.error || 'Failed to fetch user');
        }
      } catch (err) {
        console.error(`useUser hook: Exception for user ${userId}:`, err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return { data, loading, error };
}

export function useAuditor(auditorId: string) {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auditorId) {
      setLoading(false);
      return;
    }
    
    const fetchData = async () => {
      try {
        console.log(`useAuditor hook: Fetching auditor ${auditorId}`);
        setLoading(true);
        setError(null);
        const response = await apiClient.getAuditor(auditorId);
        console.log(`useAuditor hook: Full response for ${auditorId}:`, response);
        
        if (response.success && response.data) {
          console.log(`useAuditor hook: Setting auditor data:`, response.data);
          setData(response.data);
        } else {
          console.error(`useAuditor hook: Failed to load auditor ${auditorId}:`, response.error);
          setError(response.error || 'Failed to fetch auditor');
        }
      } catch (err) {
        console.error(`useAuditor hook: Exception for auditor ${auditorId}:`, err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [auditorId]);

  return { data, loading, error };
}

// Hook for API mutations (POST, PUT, DELETE)
export function useApiMutation<TData, TVariables = void>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (
    apiCall: (variables: TVariables) => Promise<ApiResponse<TData>>
  ) => {
    return async (variables: TVariables): Promise<TData | null> => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiCall(variables);
        
        if (response.success && response.data !== null) {
          return response.data;
        } else {
          setError(response.error || 'An error occurred');
          return null;
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        return null;
      } finally {
        setLoading(false);
      }
    };
  };

  return { mutate, loading, error };
}