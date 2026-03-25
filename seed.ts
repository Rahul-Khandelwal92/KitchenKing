/**
 * Kitchen Mode - Data Seed Script
 * Generates 50+ realistic recipes for the MVP.
 */

const ADJECTIVES = ['Spicy', 'Quick', 'Creamy', 'Zesty', 'Savory', 'Crispy', 'Rustic', 'Homestyle', 'Golden'];
const MAINS = ['Chicken', 'Salmon', 'Paneer', 'Lentil', 'Chickpea', 'Tofu', 'Beef', 'Shrimp', 'Pasta'];
const STYLES = ['Bowl', 'Stir-Fry', 'Curry', 'Salad', 'Tacos', 'Roast', 'Soup', 'Skillet'];

// Base templates to ensure quality
const BASE_RECIPES = [
  {
    title: "Lemon Garlic Butter Chicken",
    cuisine: "Continental",
    mealType: "Dinner",
    baseCalories: 420,
    baseProtein: 38,
    ingredients: ["Chicken Breast", "Lemon", "Garlic", "Butter", "Parsley"],
    steps: ["Season chicken.", "Pan sear for 6 mins.", "Add garlic and butter.", "Simmer with lemon juice."],
    tags: ["High Protein", "Quick"]
  },
  {
    title: "15-Min Miso Salmon",
    cuisine: "Asian",
    mealType: "Dinner",
    baseCalories: 450,
    baseProtein: 32,
    ingredients: ["Salmon Fillet", "Miso Paste", "Soy Sauce", "Ginger", "Scallions"],
    steps: ["Whisk miso glaze.", "Brush on salmon.", "Broil for 8-10 mins.", "Garnish with scallions."],
    tags: ["Omega-3", "Healthy"]
  },
  {
    title: "Classic Dal Tadka",
    cuisine: "Indian",
    mealType: "Lunch",
    baseCalories: 320,
    baseProtein: 14,
    ingredients: ["Yellow Lentils", "Ghee", "Cumin Seeds", "Garlic", "Green Chili"],
    steps: ["Boil lentils with turmeric.", "Prepare tempering (tadka) in ghee.", "Pour tadka over dal.", "Simmer for 5 mins."],
    tags: ["Vegetarian", "Comfort"]
  },
  {
    title: "Spicy Paneer Wrap",
    cuisine: "Indian",
    mealType: "Lunch",
    baseCalories: 550,
    baseProtein: 22,
    ingredients: ["Paneer", "Whole Wheat Wrap", "Yogurt", "Chili Powder", "Bell Peppers"],
    steps: ["Marinate paneer cubes.", "Sauté peppers and paneer.", "Warm the wrap.", "Assemble with yogurt sauce."],
    tags: ["Vegetarian", "Quick"]
  },
  {
    title: "Avocado Pesto Pasta",
    cuisine: "Italian",
    mealType: "Dinner",
    baseCalories: 480,
    baseProtein: 12,
    ingredients: ["Linguine", "Ripe Avocado", "Basil", "Walnuts", "Parmesan"],
    steps: ["Boil pasta.", "Blend avocado, basil, and walnuts.", "Toss pasta with sauce.", "Top with cheese."],
    tags: ["Vegetarian", "Fresh"]
  },
  {
    title: "Sheet Pan Fajitas",
    cuisine: "Mexican",
    mealType: "Dinner",
    baseCalories: 400,
    baseProtein: 28,
    ingredients: ["Chicken Strips", "Bell Peppers", "Onion", "Fajita Seasoning", "Tortillas"],
    steps: ["Toss veggies and meat in spice.", "Roast at 400°F for 15 mins.", "Serve hot with tortillas."],
    tags: ["Family Favorite", "Easy Cleanup"]
  }
];

// Heuristic Health Score Calculator
function calculateHealthScore(calories, protein, tags) {
  let score = 80; // Base score
  
  // Calorie penalty/bonus
  if (calories > 700) score -= 15;
  else if (calories < 500) score += 10;

  // Protein bonus
  if (protein > 30) score += 15;
  else if (protein > 20) score += 5;

  // Tag adjustments
  if (tags.includes("Vegetarian")) score += 5;
  if (tags.includes("Fresh")) score += 5;
  if (tags.includes("Deep Fried")) score -= 20;

  // Cap at 100
  return Math.min(100, Math.max(0, score));
}

function getGrade(score) {
  if (score >= 95) return 'A+';
  if (score >= 85) return 'A';
  if (score >= 70) return 'B';
  return 'C';
}

export function generateRecipes() {
  const recipes = [];
  let idCounter = 1;

  // Generate 60 recipes
  for (let i = 0; i < 60; i++) {
    const template = BASE_RECIPES[i % BASE_RECIPES.length];
    
    // Variance
    const variance = Math.floor(Math.random() * 3); // 0, 1, or 2
    let title = template.title;
    
    if (variance === 1) {
      const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
      title = `${adj} ${template.title}`;
    } else if (variance === 2) {
      // Swap main ingredient logic slightly for variety in title
      title = `${template.cuisine} Style ${template.title.split(' ').slice(1).join(' ')}`;
    }

    const cooksCount = Math.floor(Math.random() * 5000) + 50;
    const rating = (3.5 + Math.random() * 1.5).toFixed(1);
    
    // Nutrition Variance
    const calVar = Math.floor(Math.random() * 100) - 50;
    const calories = template.baseCalories + calVar;
    const protein = template.baseProtein + Math.floor(Math.random() * 5);
    const carbs = 20 + Math.floor(Math.random() * 40);
    const fat = 10 + Math.floor(Math.random() * 20);

    const healthScore = calculateHealthScore(calories, protein, template.tags);
    
    // Time Logic
    const prepTime = 5 + Math.floor(Math.random() * 15);
    const cookTime = 10 + Math.floor(Math.random() * 20);
    const totalTime = prepTime + cookTime;

    // Badges logic
    const badges = [];
    if (totalTime <= 20) badges.push("Quick Fix");
    if (cooksCount > 3000) badges.push("Community Favorite");
    if (healthScore > 90) badges.push("Super Healthy");
    if (template.mealType === "Dinner") badges.push("Weeknight Hero");

    const recipe = {
      id: String(idCounter++),
      title: title,
      subtitle: `${template.mealType} • ${template.cuisine}`,
      image: `https://source.unsplash.com/800x600/?food,${template.ingredients[0].split(' ')[0]}`,
      // Fallback image logic would go here if Unsplash is flaky, but keeping simple for seed
      rating: parseFloat(rating),
      reviewCount: Math.floor(cooksCount * 0.1),
      cooksThisWeek: Math.floor(cooksCount / 10),
      totalTime,
      prepTime,
      servings: 2,
      tags: [...template.tags],
      badges: badges.slice(0, 1), // Take top badge
      nutrition: {
        calories,
        protein,
        carbs,
        fat,
        score: getGrade(healthScore)
      },
      ingredients: template.ingredients.map(ing => ({
        item: ing,
        amount: "As needed", // Simplified for MVP gen
        isPantryItem: Math.random() > 0.7
      })),
      steps: template.steps.map(step => ({
        instruction: step,
        durationSeconds: 60 * 5 // Generic 5 min per step for timer
      }))
    };
    
    // Use the hardcoded specific images for the first few to match the design mock
    if (i === 0) recipe.image = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTpQYGZXFmNIYR-n1OKJALaOjCdj-UJAMgRJNDoGEYXn7RawDwmVCu_GOBAAMKeNi8EEHQw1bDQntLJ8LUzVBBneNCEoG44mfgpJ_69ugtRzqin1nUqbdAs9Eu0FW9nl-SgQxBln8VMLQUegMfuhgDRcBAR9551PnQ3hI0PMwFTnHLiaIw_5Kx9Jrdhi_5ekb8eIJr9FYdF56zQGpqerPnci4h2GEJYOUzut8vGXE6NM7BiuVzxTrk6KNmYM-_BSnxtlS-1y37_uKP';
    if (i === 1) recipe.image = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ-gVrjy27K2KuBfVf-BUgHg-rFp8hxk-ftYuKaNgIo2KqWAR6rUoszpXmq4V9WNkODwA4ojti1_4-9O9jYfh7Xo-5nPkaCaR6-g9riK7cS9a-mfWTrWc-TzXmxYCdaFaSWz-dOOylYuSYUrdPkLkmsFwYzvB4L6tVLaLyPoajOx-hGJ-vzlOnbXFbBncNeGxnB2rq7zQveBkZMyUocHB_iB53FbLkNkGKtB3_ealetnoAGeVxr0wrInFq9dPshiLtL2hO2WF-8P8b';
    
    recipes.push(recipe);
  }

  return recipes;
}


