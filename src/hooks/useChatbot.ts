import { useState, useCallback } from 'react';
import { ChatMessage } from '@/components/AIChatbot/AIChatbot';
import { ChatbotContext } from '@/lib/chatbot-context';
import { buildContextualPrompt } from '@/lib/chatbot-context';
import { SYSTEM_PROMPT } from '@/lib/chatbot-prompts';
import { detectCrisisIndicators, getCrisisResponse } from '@/lib/crisis-detection';

export function useChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addSystemMessage = useCallback((content: string) => {
    const systemMessage: ChatMessage = {
      role: 'assistant',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, systemMessage]);
  }, []);

  const sendMessage = useCallback(async (userMessage: string, context: ChatbotContext) => {
    const userMsg: ChatMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);

    const crisisLevel = detectCrisisIndicators(userMessage);
    const crisisResponse = getCrisisResponse(crisisLevel);

    if (crisisResponse) {
      const crisisMsg: ChatMessage = {
        role: 'assistant',
        content: crisisResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, crisisMsg]);
      
      if (crisisLevel === 'CRITICAL') {
        return;
      }
    }

    setIsLoading(true);

    try {
      const contextualPrompt = buildContextualPrompt(userMessage, context, messages);
      
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.slice(-5).map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content: contextualPrompt }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again in a moment, or if you need immediate support, please reach out to a mental health professional.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    sendMessage,
    isLoading,
    addSystemMessage,
    clearMessages
  };
}
