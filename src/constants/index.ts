export const APP_CONFIG = {
  name: 'Mental Health Journal',
  version: '1.0.0',
  description: 'A supportive journaling app for mental wellness',
} as const;

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '',
  timeout: 10000,
  retries: 3,
} as const;

export const OPENAI_CONFIG = {
  model: 'gpt-4',
  maxTokens: 500,
  temperature: 0.7,
  presencePenalty: 0.1,
  frequencyPenalty: 0.1,
} as const;

export const CRISIS_LEVELS = {
  SAFE: 'SAFE',
  CONCERNING: 'CONCERNING',
  CRITICAL: 'CRITICAL',
} as const;

export const EMERGENCY_NUMBERS = {
  crisis: '116 123',
  emergency: '112',
  suicidePrevention: '116 123',
} as const;

export const VALIDATION_RULES = {
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
  },
  name: {
    minLength: 2,
    maxLength: 50,
  },
  email: {
    maxLength: 255,
  },
} as const;

export const UI_CONSTANTS = {
  animationDuration: 200,
  maxMessageLength: 1000,
  maxJournalEntryLength: 10000,
  debounceDelay: 500,
} as const;

export const THEME_CONFIG = {
  light: 'light',
  dark: 'dark',
} as const;
