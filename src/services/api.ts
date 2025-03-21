import axios, { AxiosError } from 'axios';

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds timeout
});

// Types for API responses
export interface ConversionResult {
  id: string;
  originalCode: string;
  convertedCode: string;
  timestamp: string;
  status: 'success' | 'error';
  errorMessage?: string;
}

export interface HistoryItem {
  id: string;
  originalCode: string;
  convertedCode: string;
  timestamp: string;
  status: 'success' | 'error';
  errorMessage?: string;
}

export interface HistoryParams {
  page: number;
  limit: number;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface HistoryResponse {
  items: HistoryItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Error handling helper
const handleApiError = (error: unknown) => {
  const axiosError = error as AxiosError;
  
  if (axiosError.response) {
    // Server responded with a status code that falls out of the range of 2xx
    const data = axiosError.response.data as any;
    throw new Error(data.message || 'An error occurred while processing your request');
  } else if (axiosError.request) {
    // The request was made but no response was received
    throw new Error('No response from server. Please check your connection');
  } else {
    // Something happened in setting up the request that triggered an Error
    throw new Error('Failed to make request. Please try again later');
  }
};

/**
 * Convert PHP code to Node.js code
 * @param phpCode - The PHP code to convert
 * @returns Promise with the conversion result
 */
export const convertCode = async (phpCode: string): Promise<ConversionResult> => {
  try {
    const response = await api.post<ConversionResult>('/convert', { code: phpCode });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Fetch conversion history with pagination and filtering
 * @param params - Pagination and filtering parameters
 * @returns Promise with the history items and pagination metadata
 */
export const fetchHistory = async (params: HistoryParams): Promise<HistoryResponse> => {
  try {
    const response = await api.get<HistoryResponse>('/history', { params });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Fetch a single conversion by ID
 * @param id - The conversion ID
 * @returns Promise with the conversion details
 */
export const fetchConversionById = async (id: string): Promise<ConversionResult> => {
  try {
    const response = await api.get<ConversionResult>(`/history/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export default api;