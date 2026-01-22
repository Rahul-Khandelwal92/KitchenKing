import { Recipe } from './types';

export const RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'One-Pan Lemon Chicken',
    subtitle: 'Dinner • High Protein',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTpQYGZXFmNIYR-n1OKJALaOjCdj-UJAMgRJNDoGEYXn7RawDwmVCu_GOBAAMKeNi8EEHQw1bDQntLJ8LUzVBBneNCEoG44mfgpJ_69ugtRzqin1nUqbdAs9Eu0FW9nl-SgQxBln8VMLQUegMfuhgDRcBAR9551PnQ3hI0PMwFTnHLiaIw_5Kx9Jrdhi_5ekb8eIJr9FYdF56zQGpqerPnci4h2GEJYOUzut8vGXE6NM7BiuVzxTrk6KNmYM-_BSnxtlS-1y37_uKP',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ-gVrjy27K2KuBfVf-BUgHg-rFp8hxk-ftYuKaNgIo2KqWAR6rUoszpXmq4V9WNkODwA4ojti1_4-9O9jYfh7Xo-5nPkaCaR6-g9riK7cS9a-mfWTrWc-TzXmxYCdaFaSWz-dOOylYuSYUrdPkLkmsFwYzvB4L6tVLaLyPoajOx-hGJ-vzlOnbXFbBncNeGxnB2rq7zQveBkZMyUocHB_iB53FbLkNkGKtB3_ealetnoAGeVxr0wrInFq9dPshiLtL2hO2WF-8P8b',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvd-y3IH-IG04rjqLB7k3FRk0yAkdAVj5vGRhNG8aQ6PFdpJI5qEm_CSe7N9LRP1Mtkfs5alTMllLGM7gurnjdjYxIXTz1n7OzCWRh22Ipsm-ILSKLBCo83M9o682O99yGk3b2voj951_Ig7-7OGiRxBmg9nVxzwP3A2nZwwoQi3_UVHnxBlXthh4YnBFDpABKFJ9daiYY668KmHuSbJbXjK2YxLcPTc0YaloLGHHatkYhXl4ZbHFTEvL7zFKtRgVdcc3ouYDCPwAG',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8MMQFBmK8PvX757gwPe3AwsZCR9JWeGycYRyom9gUwPf3G_figHR6Ijg4Psb2DJSi8n6gETI6iwgJCg_Kcedxv8Nvfn47H_pGS9CuB0jAo0s8Vocz0NmcS8F4HMp44VAZLKGcXQbY5KroYtHWUgEWxtDc7fIlI4Jb_72JmsCD8tm_BqV2y1BmKId-93QfNg56b7-LCKPPsr0YVFyyHLbNhTDNAbJTQlf3B88I6nf7ibqIHcZDqctwiFJpmUBiO-qrU6mV1Hk62O3n',
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
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAEc9DghQ2CdY7GvCWXJibZgse__vARKSAocHvUfEWeJyH5SXf37nEmsHedtLJxG56KGlcoa1qOb3FAh4OBf50QQ20K_hXWfB4tgrI_ffo_oYZ2zXLh49JvY6PYiiknnxQfV0yINP6k_ga4GzPYqAa6mfz2UiPFdtbvL9opK9l5wgUTQrSNDVGR4LK_gDXzcRUj7UkjVKOUeZCHluWnCjmCLs-KrhRwPelZb4OZoHuHzBYwDLS6AjJc2efqA1A9mBgOaB4uqeESydhW',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDHtOrjgiZ0FJYzKPJuefycWQk-vfY11lbz8CU-SozI7kwtEgtxNZforff-YuI0bNxVIBoAmSNCKn1Zv7ahHbETMCndnuRxRq7ZzKL-ufA54R1Yt49TIiE-gFnRDqlb1dCVoR5FLsHrq_S4kSdKAo71czBKzqOluuncRIIAnqW8VI5s0q_PLsqdVD_0mrrb9AEd2kboQf4Zy83Rn2uX1w3GvmaX8Evi-ZATHbPQ53_mxYFGC65spMiBIG6jDWalqFo7CaUJs20_R19C'
];
