import { ChatMessage, ApiResponse } from '@/types';

export interface ChatbotResponse {
  content: string;
  usage?: unknown;
  model?: string;
}

export class ChatbotService {
  static async sendMessage(messages: ChatMessage[]): Promise<ApiResponse<ChatbotResponse>> {
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { error: data.error || 'Failed to get AI response' };
      }

      return { data };
    } catch {
      return { error: 'Failed to get AI response' };
    }
  }
}
