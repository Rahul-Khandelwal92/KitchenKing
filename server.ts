import express from 'express';
import cors from 'cors';
import { generateRecipes } from './seed';
import { createServer as createViteServer } from 'vite';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // In-Memory Database
  const db = {
    recipes: generateRecipes(),
    saved: {} as Record<string, string[]>
  };

  // --- ROUTES ---

  // 1. GET /api/recipes
  app.get('/api/recipes', (req, res) => {
    let results = db.recipes;
    const { search, maxTime, type, limit } = req.query;

    if (search) {
      const q = (search as string).toLowerCase();
      results = results.filter((r: any) => 
        r.title.toLowerCase().includes(q) || 
        r.tags.some((t: string) => t.toLowerCase().includes(q)) ||
        r.ingredients.some((i: any) => i.item.toLowerCase().includes(q))
      );
    }

    if (maxTime) {
      results = results.filter((r: any) => r.totalTime <= parseInt(maxTime as string));
    }

    if (type) {
      if (type === 'Quickest') {
        results = results.sort((a: any, b: any) => a.totalTime - b.totalTime);
      } else {
        results = results.filter((r: any) => r.tags.includes(type) || r.title.includes(type));
      }
    }

    if (limit) {
      results = results.slice(0, parseInt(limit as string));
    }

    res.json(results);
  });

  // 2. GET /api/recipes/:id
  app.get('/api/recipes/:id', (req, res) => {
    const recipe = db.recipes.find((r: any) => r.id === req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json(recipe);
  });

  // 3. GET /api/saved
  app.get('/api/saved', (req, res) => {
    const userId = "user_1";
    const savedIds = db.saved[userId] || [];
    const savedRecipes = db.recipes.filter((r: any) => savedIds.includes(r.id));
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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Start Server
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Kitchen Mode Backend running on http://localhost:${PORT}`);
    console.log(`Seeded ${db.recipes.length} recipes.`);
  });
}

startServer();
