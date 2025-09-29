// API client for Tawtheeq Admin Panel
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6060/api";

// Types for API responses
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message?: string;
  error?: string;
}

export interface User {
  user_id: string;
  name: string;
  role: string;
  phone_no: string | null;
  email: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  government_id: string | null;
  created_at: string;
  updated_at: string | null;
  firebase_uid: string | null;
  profile_picture: string | null;
  fcm_token: string | null;
}

export interface Contract {
  id: string;
  title: string;
  originator: string;
  responder: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
  value?: number;
}

export interface Auditor {
  id: string;
  name: string;
  email: string;
  status: string;
  assignedContracts: number;
  createdAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalContracts: number;
  activeAuditors: number;
  pendingReviews: number;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

// Generic API client
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        ...options.headers,
      },
      cache: 'no-store',
    };

    try {
      const response = await fetch(url, { ...defaultOptions, ...options });
      
      if (!response.ok) {
        console.error(`API Error: ${response.status} - ${response.statusText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Dashboard Stats
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return this.request<DashboardStats>('/stats');
  }

  // Users
  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.request<User[]>('/users');
  }

  async getUser(id: string): Promise<ApiResponse<User>> {
    const response = await this.request<User>(`/users/${id}`);

    if (!response.success) {
      return {
        success: false,
        data: null,
        error: response.error || 'Failed to fetch user',
      };
    }

    if (!response.data) {
      return {
        success: false,
        data: null,
        error: 'User not found',
      };
    }

    return {
      success: true,
      data: response.data,
    };
  }

  async createUser(userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id: string, userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Contracts
  async getContracts(): Promise<ApiResponse<Contract[]>> {
    return this.request<Contract[]>('/contracts');
  }

  async getContract(id: string): Promise<ApiResponse<Contract>> {
    return this.request<Contract>(`/contracts/${id}`);
  }

  async createContract(contractData: Partial<Contract>): Promise<ApiResponse<Contract>> {
    return this.request<Contract>('/contracts', {
      method: 'POST',
      body: JSON.stringify(contractData),
    });
  }

  async updateContract(id: string, contractData: Partial<Contract>): Promise<ApiResponse<Contract>> {
    return this.request<Contract>(`/contracts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contractData),
    });
  }

  async deleteContract(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/contracts/${id}`, {
      method: 'DELETE',
    });
  }

  // Auditors (filtered users with lawyer role)
  async getAuditors(): Promise<ApiResponse<Auditor[]>> {
    const response = await this.getUsers();
    if (!response.success) {
      return {
        success: false,
        data: [] as Auditor[],
        error: response.error,
      };
    }

    const users = response.data ?? [];

    const auditors = users
      .filter(user => (user.role ?? '').toLowerCase() === 'lawyer' || (user.role ?? '').toLowerCase() === 'auditor')
      .map(user => ({
        id: user.user_id,
        name: user.name,
        email: user.email || 'N/A',
        status: 'Active', // You can enhance this based on actual user status
        assignedContracts: 0, // This would come from a separate endpoint
        createdAt: user.created_at,
      }));

    return {
      success: true,
      data: auditors,
    };
  }

  async getAuditor(id: string): Promise<ApiResponse<User>> {
    // Reuse the user endpoint; some auditor records might not have role data yet
    const response = await this.getUser(id);

    if (!response.success || !response.data) {
      return response;
    }

    const user = response.data;
    const userRole = (user.role ?? '').toLowerCase();

    if (userRole !== 'lawyer' && userRole !== 'auditor') {
      // Return the user data but include a warning message so the UI can show a badge
      return {
        success: true,
        data: {
          ...user,
          role: user.role ?? 'auditor',
        },
        message: 'Role not marked as auditor; displaying user data anyway.',
      };
    }

    return response;
  }

  // Templates
  async getTemplates(): Promise<ApiResponse<Template[]>> {
    return this.request<Template[]>('/templates');
  }

  async getTemplate(id: string): Promise<ApiResponse<Template>> {
    return this.request<Template>(`/templates/${id}`);
  }

  async createTemplate(templateData: Partial<Template>): Promise<ApiResponse<Template>> {
    return this.request<Template>('/templates', {
      method: 'POST',
      body: JSON.stringify(templateData),
    });
  }

  async updateTemplate(id: string, templateData: Partial<Template>): Promise<ApiResponse<Template>> {
    return this.request<Template>(`/templates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(templateData),
    });
  }

  async deleteTemplate(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/templates/${id}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return this.request<{ status: string; timestamp: string }>('/health');
  }
}

// Create and export a singleton instance
const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;

// Export individual API functions for convenience
export const {
  getDashboardStats,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getContracts,
  getContract,
  createContract,
  updateContract,
  deleteContract,
  getAuditors,
  getAuditor,
  getTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  healthCheck,
} = apiClient;