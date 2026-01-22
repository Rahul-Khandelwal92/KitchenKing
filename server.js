const express = require('express');
const cors = require('cors');
const { generateRecipes } = require('./seed');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-Memory Database
const db = {
  recipes: generateRecipes(),
  saved: {} // Map<userId, Set<recipeId>>
};

// --- ROUTES ---

// 1. GET /api/recipes
// Supports: search, maxTime, type, limit
app.get('/api/recipes', (req, res) => {
  let results = db.recipes;
  const { search, maxTime, type, limit } = req.query;

  // Filter: Search
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(r => 
      r.title.toLowerCase().includes(q) || 
      r.tags.some(t => t.toLowerCase().includes(q)) ||
      r.ingredients.some(i => i.item.toLowerCase().includes(q))
    );
  }

  // Filter: Time
  if (maxTime) {
    results = results.filter(r => r.totalTime <= parseInt(maxTime));
  }

  // Filter: Type (Quickest, Healthy, etc mapped from frontend tags)
  if (type) {
    if (type === 'Quickest') {
      results = results.sort((a, b) => a.totalTime - b.totalTime);
    } else {
      results = results.filter(r => r.tags.includes(type) || r.title.includes(type));
    }
  }

  // Limit
  if (limit) {
    results = results.slice(0, parseInt(limit));
  }

  res.json(results);
});

// 2. GET /api/recipes/:id
app.get('/api/recipes/:id', (req, res) => {
  const recipe = db.recipes.find(r => r.id === req.params.id);
  if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
  res.json(recipe);
});

// 3. GET /api/saved
// Returns full recipe objects for saved IDs
app.get('/api/saved', (req, res) => {
  // Mock User ID "user_1" for MVP
  const userId = "user_1";
  const savedIds = db.saved[userId] || [];
  
  const savedRecipes = db.recipes.filter(r => savedIds.includes(r.id));
  res.json(savedRecipes);
});

// 4. POST /api/saved/:id
app.post('/api/saved/:id', (req, res) => {
  const userId = "user_1";
  const recipeId = req.params.id;

  if (!db.saved[userId]) db.saved[userId] = [];
  
  if (!db.saved[userId].includes(recipeId)) {
    db.saved[userId].push(recipeId);
  }
  
  res.json({ success: true, saved: true });
});

// 5. DELETE /api/saved/:id
app.delete('/api/saved/:id', (req, res) => {
  const userId = "user_1";
  const recipeId = req.params.id;

  if (db.saved[userId]) {
    db.saved[userId] = db.saved[userId].filter(id => id !== recipeId);
  }
  
  res.json({ success: true, saved: false });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Kitchen Mode Backend running on http://localhost:${PORT}`);
  console.log(`Seeded ${db.recipes.length} recipes.`);
});
