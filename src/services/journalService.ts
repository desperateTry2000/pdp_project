import { JournalEntry, ApiResponse } from '@/types';

export class JournalService {
  static async getEntries(month: string): Promise<ApiResponse<JournalEntry[]>> {
    try {
      const response = await fetch(`/api/journal?month=${month}`);
      const data = await response.json();
      
      if (!response.ok) {
        return { error: data.error || 'Failed to fetch entries' };
      }

      return { data };
    } catch (error) {
      return { error: 'Failed to fetch entries' };
    }
  }

  static async saveEntry(entry: JournalEntry): Promise<ApiResponse<JournalEntry>> {
    try {
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { error: data.error || 'Failed to save entry' };
      }

      return { data, message: 'Entry saved successfully' };
    } catch (error) {
      return { error: 'Failed to save entry' };
    }
  }

  static async deleteEntry(date: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`/api/journal?date=${date}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        return { error: data.error || 'Failed to delete entry' };
      }

      return { message: 'Entry deleted successfully' };
    } catch (error) {
      return { error: 'Failed to delete entry' };
    }
  }
}
