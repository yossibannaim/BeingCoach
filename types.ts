
export interface ActionSubArea {
  objectId: string;
  name: string;
  desc?: string;
  videos?: Array<{ title: string; desc: string }>;
}

export interface ActionArea {
  objectId: string;
  name: string;
  order: number;
  isTarget: boolean; // True = Goal setting, False = Tracking
  sliderMin: number;
  sliderMax: number;
  sliderStep: number;
  questions: string[];
  subarea?: {
    name: string;
    videos: any[];
  };
  itemsEx?: Array<{ name: string; disabled: boolean }>;
}

export interface UserState {
  identity: string;
  energyLevel: number;
  completedTasks: string[];
}

export interface BeingContextType {
  actionAreas: ActionArea[];
  currentIdentity: string;
  setIdentity: (identity: string) => void;
  isLoading: boolean;
}

// New Types for Admin Console
export interface Challenge {
  id: string;
  text: string;
}

export interface RecoveryStrategy {
  id: string;
  text: string;
}

export interface KeyAchievement {
  title: string;
  targetDate: string;
  description: string;
}

export interface KeyTask {
  title: string;
  isCompleted: boolean;
}

// Dashboard Specific Types
export interface DailyStat {
  date: string;
  score: number; // 0-100
  tasksCompleted: number;
}

export interface IdentityStat {
  name: string;
  count: number;
  color: string;
}

export interface CategoryStat {
  name: string;
  value: number; // 0-100 completion rate
}

export interface RecentLog {
    id: string;
    date: string;
    time: string;
    action: string;
    category: string;
    score: number | string;
}

export interface AppData {
  identities: string[];
  actionAreas: ActionArea[];
  challenges: Challenge[];
  recoveryStrategies: RecoveryStrategy[];
  keyAchievement: KeyAchievement;
  keyTask: KeyTask;
  processSummary: string;
  
  // New Fields for Settings Menu
  dailyWriting: string;
  personalRequest: string;
  nextPracticeTime: string;

  // Data Pools from Methodology
  poolIdentities: string[];
  poolChallenges: string[];
  poolRecoveryStrategies: string[];
  // Dashboard Data
  dashboardStats: {
      dailyHistory: DailyStat[];
      identityUsage: IdentityStat[];
      categoryPerformance: CategoryStat[];
      recentLogs: RecentLog[];
  }
}
