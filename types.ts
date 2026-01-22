export interface Ingredient {
  item: string;
  amount: string;
  isPantryItem?: boolean;
}

export interface Step {
  instruction: string;
  tip?: string;
  durationSeconds?: number; // For the timer
}

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  score: 'A+' | 'A' | 'B' | 'C';
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string; // e.g., "Dinner • High Protein"
  image: string;
  rating: number;
  reviewCount: number;
  cooksThisWeek: number;
  totalTime: number; // minutes
  prepTime: number;
  servings: number;
  tags: string[]; // e.g. "Healthy", "Quick"
  nutrition: Nutrition;
  ingredients: Ingredient[];
  steps: Step[];
  badges: string[]; // e.g., "Weeknight Favorite"
  successRate?: number; // Social proof
}

export type ViewState = 'HOME' | 'SEARCH' | 'SAVED' | 'LIST' | 'DETAILS' | 'COOKING';
