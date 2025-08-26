export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface Session {
  user: User;
  expires: string;
}

export interface JournalEntry {
  date: string;
  content: string;
  isAlarming: boolean;
}

export interface JournalAnalysis {
  isAlarming: boolean;
  categories?: Record<string, boolean>;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface ChatbotContext {
  currentEntry?: string;
  previousEntries?: Array<{
    content: string;
    date: string;
    isAlarming: boolean;
  }>;
  safetyFlags?: boolean;
  userHistory?: unknown[];
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  database: 'connected' | 'disconnected';
  error?: string;
}

export interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

export interface SignInForm {
  email: string;
  password: string;
}

export interface CalendarDay {
  date: string;
  isCurrentMonth: boolean;
  isSelected: boolean;
  hasEntry: boolean;
  isAlarming: boolean;
}
