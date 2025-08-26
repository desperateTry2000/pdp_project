import { CRISIS_KEYWORDS, CRISIS_RESPONSE } from './chatbot-prompts';

export type CrisisLevel = 'SAFE' | 'CONCERNING' | 'CRITICAL';

export function detectCrisisIndicators(content: string): CrisisLevel {
  const lowerContent = content.toLowerCase();
  
  const hasCriticalKeywords = CRISIS_KEYWORDS.some(keyword => 
    lowerContent.includes(keyword)
  );
  
  if (hasCriticalKeywords) {
    return 'CRITICAL';
  }
  
  const concerningPatterns = [
    /i (feel|am) (so|very|extremely) (sad|depressed|hopeless)/i,
    /(don't|can't) (see|find) (any|a) (point|reason|hope)/i,
    /(want|wish) (to|i) (disappear|vanish|not exist)/i,
    /(everyone|people) (would|will) (be better|better off)/i
  ];
  
  const hasConcerningPatterns = concerningPatterns.some(pattern => 
    pattern.test(content)
  );
  
  if (hasConcerningPatterns) {
    return 'CONCERNING';
  }
  
  return 'SAFE';
}

export function getCrisisResponse(level: CrisisLevel): string | null {
  if (level === 'CRITICAL') {
    return CRISIS_RESPONSE;
  }
  
  if (level === 'CONCERNING') {
    return `I notice you're sharing some difficult thoughts and feelings. While I'm here to listen and support you, it's important to remember that professional help can provide the specialized support you deserve. 

Consider reaching out to a mental health professional or counselor who can work with you directly.`;
  }
  
  return null;
}

export function shouldEscalateToCrisis(content: string): boolean {
  const level = detectCrisisIndicators(content);
  return level === 'CRITICAL' || level === 'CONCERNING';
}
