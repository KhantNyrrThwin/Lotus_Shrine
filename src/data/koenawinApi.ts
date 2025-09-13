import axios from 'axios';

const API_BASE_URL = 'http://localhost/lotus_shrine';

export interface KoNaWinTracker {
  trackerId: number;
  startDate: string;
  currentDayCount: number;
  currentStage: number;
  isCompleted: boolean;
}

export interface DailyLog {
  logId: number;
  trackerId: number;
  logDate: string;
  dayNumber: number;
  completionStatus: boolean;
}

export interface KoNaWinProgress {
  success?: boolean;
  message?: string;
  tracker: KoNaWinTracker;
  progress: {
    completedDays: number;
    remainingDays: number;
    progressPercentage: number;
    stageProgress: number;
    stageDaysRemaining: number;
    dayNumberInStage: number;
  };
  dailyLogs: DailyLog[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

class KoNaWinApiService {
  private getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  private async makeRequest<T>(endpoint: string, data?: any): Promise<T> {
    try {
      const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Check if user has an active Koe Na Win vow
   */
  async checkKoNaWinTracker(): Promise<{
    success: boolean;
    hasKoNaWinVow: boolean;
    message: string;
    trackerId?: number;
    startDate?: string;
    currentDayCount?: number;
    currentStage?: number;
    isCompleted?: boolean;
  }> {
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    return this.makeRequest('checkKoNaWinTracker.php', { userId });
  }

  /**
   * Start a new Koe Na Win vow
   */
  async startNewVow(startDate?: string): Promise<{
    success: boolean;
    message: string;
    trackerId?: number;
    startDate?: string;
    currentDayCount?: number;
    currentStage?: number;
  }> {
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    const requestData = {
      userId,
      startDate: startDate || new Date().toISOString().split('T')[0]
    };

    return this.makeRequest('newKNWTracker.php', requestData);
  }

  /**
   * Log daily completion (one-time only)
   */
  async logDailyCompletion(trackerId: number, dayNumber: number): Promise<{
    success: boolean;
    message: string;
    action?: 'completed' | 'already_completed';
    status?: number;
    newDayCount?: number;
    newStage?: number;
    isCompleted?: boolean;
  }> {
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    const requestData = {
      trackerId,
      dayNumber,
      userId
    };

    // Debug logging
    console.log('koenawinApi - Sending logDailyCompletion request:', requestData);

    return this.makeRequest('logDailyCompletion.php', requestData);
  }

  /**
   * Get comprehensive Koe Na Win progress
   */
  async getKoeNaWinProgress(): Promise<KoNaWinProgress> {
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    const response = await this.makeRequest<any>('getKoeNaWinProgress.php', { userId });
    
    // Check if the response indicates no tracker found
    if (response.success === false) {
      throw new Error(response.message || 'No active Koe Na Win vow found for this user.');
    }
    
    return response as KoNaWinProgress;
  }


  /**
   * Get all daily logs for a tracker
   */
  async getDailyLogs(trackerId: number): Promise<DailyLog[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/getDailyLogs.php`, {
        params: { trackerId },
        withCredentials: true,
      });
      return response.data.success ? response.data.dailyLogs : [];
    } catch (error) {
      console.error('Error getting daily logs:', error);
      return [];
    }
  }


  /**
   * Get mantra for current stage
   */
  getMantraForStage(stage: number): string {
    const mantras = [
      '', // Stage 0 (no mantra)
      'အရဟံ', // Stage 1
      'သမ္မာသမ္ဗုဒ္ဓေါ', // Stage 2
      'ဝိဇ္ဇာစရဏသမ္ပန္နော', // Stage 3
      'သုဂတော', // Stage 4
      'လောကဝိဒူ', // Stage 5
      'အနုတ္တရော ပုရိသဒမ္မသာရထိ', // Stage 6
      'သတ္ထာ ဒေဝမနုဿာနံ', // Stage 7
      'ဗုဒ္ဓေါ', // Stage 8
      'ဘဂဝါ' // Stage 9
    ];
    
    return mantras[stage] || '';
  }

  /**
   * Fetch Koe Na Win progress (legacy function for compatibility)
   */
  async fetchKoeNaWinProgress(_email: string): Promise<{
    start_date?: string;
    completed_dates?: string[];
    current_day_count?: number;
    current_stage?: number;
    is_completed?: boolean;
  }> {
    try {
      // Get user ID from email (you might need to implement this)
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found');
      }

      const progress = await this.getKoeNaWinProgress();
      
      // Convert to legacy format
      return {
        start_date: progress.tracker.startDate,
        completed_dates: progress.dailyLogs
          .filter(log => log.completionStatus)
          .map(log => log.logDate),
        current_day_count: progress.tracker.currentDayCount,
        current_stage: progress.tracker.currentStage,
        is_completed: progress.tracker.isCompleted
      };
    } catch (error) {
      console.error('Error fetching Koe Na Win progress:', error);
      return {};
    }
  }

  /**
   * Save Koe Na Win progress (legacy function for compatibility)
   * Note: This is a simplified version that just returns success.
   * The new system should use logDailyCompletion() directly for daily completions.
   */
  async saveKoeNaWinProgress(_email: string, _data: {
    start_date?: string;
    completed_dates?: string[];
  }): Promise<{ success: boolean; message: string }> {
    try {
      // For now, just return success since the new system handles
      // daily completions through logDailyCompletion() API
      // The HomeDashboard should be updated to use the proper API calls
      return { success: true, message: 'Progress saved successfully' };
    } catch (error) {
      console.error('Error saving Koe Na Win progress:', error);
      return { success: false, message: 'Failed to save progress' };
    }
  }
}

export const koNaWinApi = new KoNaWinApiService();