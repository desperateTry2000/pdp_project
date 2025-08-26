import { ApiResponse } from '@/types';

export interface AnalysisResult {
  isAlarming: boolean;
  categories?: Record<string, boolean>;
}

export class AnalysisService {
  static async analyzeContent(content: string): Promise<ApiResponse<AnalysisResult>> {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { error: data.error || 'Failed to analyze content' };
      }

      return { data };
    } catch (error) {
      return { error: 'Failed to analyze content' };
    }
  }
}
