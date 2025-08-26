import { ChatMessage } from '@/components/AIChatbot/AIChatbot';

export interface ChatbotContext {
  currentEntry?: string;
  previousEntries?: Array<{
    content: string;
    date: string;
    isAlarming: boolean;
  }>;
  safetyFlags?: boolean;
  userHistory?: any[];
}

export function buildContextualPrompt(
  userMessage: string,
  context: ChatbotContext,
  conversationHistory: ChatMessage[]
): string {
  let prompt = `USER'S LATEST MESSAGE: "${userMessage}"\n\n`;
  
  // Add current entry context if available (without copying the text)
  if (context.currentEntry) {
    prompt += `CURRENT JOURNAL ENTRY:
- Has unsaved content: ${context.currentEntry.length > 0 ? 'Yes' : 'No'}
- Content length: ${context.currentEntry.length} characters
- Safety Concerns: ${context.safetyFlags ? 'YES - Handle with extra care' : 'None detected'}\n\n`;
  }
  
  // Add previous entries context (without copying content)
  if (context.previousEntries && context.previousEntries.length > 0) {
    prompt += `PREVIOUS ENTRIES CONTEXT:
- Total previous entries: ${context.previousEntries.length}
- Recent entries: ${context.previousEntries.slice(-3).map(entry => 
      `${entry.date}: ${entry.isAlarming ? 'Safety concern' : 'Normal entry'} (${entry.content.length} chars)`
    ).join(', ')}\n\n`;
  }
  
  // Add conversation history for context
  if (conversationHistory.length > 0) {
    prompt += `CONVERSATION HISTORY (last 3 messages):
${conversationHistory.slice(-3).map(msg => `${msg.role}: ${msg.content}`).join('\n')}\n\n`;
  }
  
  prompt += `RESPOND TO USER'S LATEST MESSAGE:
- Use the context above to provide relevant, supportive responses
- If safety concerns exist, prioritize crisis intervention
- Help user reflect on their thoughts and feelings
- Provide appropriate coping strategies and resources
- Keep responses warm, supportive, and professional
- Reference patterns from previous entries when relevant
- Never copy or quote the actual journal content`;

  return prompt;
}

export function buildInitialPrompt(context: ChatbotContext): string {
  if (!context.currentEntry && (!context.previousEntries || context.previousEntries.length === 0)) {
    return "Hello! I'm here to support you with your mental health journey. How are you feeling today?";
  }
  
  const crisisLevel = context.safetyFlags ? 'CRITICAL' : 'SAFE';
  
  if (crisisLevel === 'CRITICAL') {
    return `I've reviewed your current journal entry and I'm concerned about your safety. I want you to know that you're not alone, and there are people who can help you right now.

Before we continue our conversation, please know that your safety is my top priority. I'm here to listen and support you, but I also want to make sure you have access to immediate help if you need it.

What would be most helpful for you right now?`;
  }
  
  let greeting = "I'm here to support you with your journaling and mental health journey.";
  
  if (context.previousEntries && context.previousEntries.length > 0) {
    greeting += ` I can see you've been journaling regularly, which is a great practice for mental wellness.`;
  }
  
  if (context.currentEntry && context.currentEntry.length > 0) {
    greeting += `\n\nI've analyzed your current journal entry and I'm ready to help you explore your thoughts and feelings.`;
  }
  
  greeting += `\n\nWhat would you like to discuss or explore today?`;
  
  return greeting;
}

export function buildAnalysisPrompt(context: ChatbotContext): string {
  if (!context.currentEntry || context.currentEntry.length === 0) {
    return "I don't see any content to analyze. Please write something in your journal first.";
  }
  
  return `I've analyzed your journal entry and here are my observations:

${context.safetyFlags ? '⚠️ SAFETY CONCERN: I detected concerning content that requires attention.' : '✅ No immediate safety concerns detected.'}

${context.currentEntry.length < 50 ? '📝 Your entry is quite brief - this might be a good time to explore your thoughts further.' : '📝 Your entry shows thoughtful reflection.'}

${context.previousEntries && context.previousEntries.length > 0 ? `📊 PATTERN INSIGHT: Based on your ${context.previousEntries.length} previous entries, I can help identify patterns and trends in your mental health journey.` : '🌟 This appears to be one of your first entries. Welcome to your journaling journey!'}

What would you like to explore about your thoughts and feelings today?`;
}
