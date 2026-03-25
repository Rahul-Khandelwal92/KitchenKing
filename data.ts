import { Recipe } from './types';

export const RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'One-Pan Lemon Chicken',
    subtitle: 'Dinner • High Protein',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 124,
    cooksThisWeek: 2300,
    totalTime: 20,
    prepTime: 10,
    servings: 2,
    tags: ['Quickest', 'High Protein'],
    badges: ['Highly Rated'],
    nutrition: {
      calories: 420,
      protein: 38,
      carbs: 12,
      fat: 22,
      score: 'A'
    },
    ingredients: [
      { item: 'Chicken Breast', amount: '2 fillets' },
      { item: 'Lemon', amount: '1 sliced' },
      { item: 'Asparagus', amount: '1 bunch' },
      { item: 'Garlic', amount: '3 cloves' },
      { item: 'Olive Oil', amount: '2 tbsp', isPantryItem: true }
    ],
    steps: [
      { instruction: 'Pat chicken dry and season generously with salt and pepper.', durationSeconds: 60 },
      { instruction: 'Sear chicken in a hot pan for 4 mins per side until golden.', durationSeconds: 480 },
      { instruction: 'Add garlic, lemon slices, and asparagus to the pan.', durationSeconds: 60 },
      { instruction: 'Cover and cook for 5 more minutes until veggies are tender.', durationSeconds: 300 }
    ]
  },
  {
    id: '2',
    title: '15-Min Miso Salmon Bowl',
    subtitle: 'Quick Lunch • Omega-3',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 89,
    cooksThisWeek: 1500,
    totalTime: 15,
    prepTime: 5,
    servings: 2,
    tags: ['Healthy', 'Quickest'],
    badges: ['Trending'],
    successRate: 98,
    nutrition: {
      calories: 450,
      protein: 32,
      carbs: 12,
      fat: 24,
      score: 'A+'
    },
    ingredients: [
      { item: 'Salmon Fillets', amount: '2 pieces (400g)' },
      { item: 'Toasted Sesame Oil', amount: '2 tablespoons', isPantryItem: true },
      { item: 'Soy Sauce', amount: '3 tablespoons' },
      { item: 'Fresh Ginger', amount: '1 inch, grated' },
      { item: 'Sesame Seeds', amount: '1 tbsp' }
    ],
    steps: [
      { instruction: 'Mix soy sauce, sesame oil, and ginger in a small bowl.', durationSeconds: 60 },
      { instruction: 'Brush glaze onto salmon fillets.', durationSeconds: 30 },
      { instruction: 'Air fry or pan sear salmon for 8-10 minutes.', durationSeconds: 540 },
      { instruction: 'Sprinkle with sesame seeds and serve over greens.', tip: 'Let it rest for 2 mins before serving.' }
    ]
  },
  {
    id: '3',
    title: 'Spicy Salmon Poke Bowl',
    subtitle: 'High Protein • Under 500 kcal',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 120,
    cooksThisWeek: 800,
    totalTime: 12,
    prepTime: 12,
    servings: 1,
    tags: ['Healthy', 'Low Carb'],
    badges: ['Weeknight Favorite'],
    nutrition: {
      calories: 480,
      protein: 35,
      carbs: 40,
      fat: 18,
      score: 'A'
    },
    ingredients: [],
    steps: []
  },
  {
    id: '4',
    title: 'Creamy Avocado Linguine',
    subtitle: 'Vegetarian • One Pot',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 85,
    cooksThisWeek: 400,
    totalTime: 15,
    prepTime: 5,
    servings: 2,
    tags: ['Healthy', 'Vegetarian'],
    badges: ['Quick Fix'],
    nutrition: {
      calories: 520,
      protein: 14,
      carbs: 60,
      fat: 28,
      score: 'B'
    },
    ingredients: [],
    steps: []
  }
];

export const AVATARS = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80'
];
