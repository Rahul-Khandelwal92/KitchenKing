import React, { useState, useEffect } from 'react';
import { ViewState, Recipe } from './types';
import { RECIPES as MOCK_RECIPES } from './data'; // Keep as fallback
import { COUPLE_NAME, PROFILE_IMG } from './constants';
import { api } from './api';
import { 
  Home, Compass, Heart, 
  Search, Bell, ArrowLeft, Share2, 
  PlayCircle, Bookmark, Star, ArrowRight,
  ChevronRight, Mic, X, Clock, Users, Loader2, Crown
} from 'lucide-react';
import { RecipeCard } from './components/RecipeCard';
import { Timer } from './components/Timer';

export default function App() {
  const [view, setView] = useState<ViewState>('HOME');
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  
  // Data State
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const [cookingStep, setCookingStep] = useState(0);

  // --- INITIAL LOAD ---
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (filterType?: string) => {
    setIsLoading(true);
    try {
      const queryParams: any = { limit: 50 };
      if (filterType) queryParams.type = filterType;

      const [allRecipes, savedList] = await Promise.all([
        api.getRecipes(queryParams),
        api.getSaved().catch(() => [])
      ]);
      setRecipes(allRecipes);
      setSavedRecipes(new Set(savedList.map((r: Recipe) => r.id)));
    } catch (e) {
      console.log("Using Mock Data");
      // Basic local filtering if backend fails
      let mocks = MOCK_RECIPES;
      if (filterType === 'Quickest') mocks = [...mocks].sort((a,b) => a.totalTime - b.totalTime);
      else if (filterType) mocks = mocks.filter(r => r.tags.includes(filterType));
      setRecipes(mocks);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFilter = (tag: string) => {
    const newFilter = activeFilter === tag ? undefined : tag;
    setActiveFilter(newFilter || null);
    loadData(newFilter);
  };

  const handleSearch = async (q: string) => {
    setSearchQuery(q);
    if (q.length > 2) {
      try {
        const results = await api.getRecipes({ search: q, limit: 50 });
        setSearchResults(results);
      } catch {
        setSearchResults(MOCK_RECIPES.filter(r => r.title.toLowerCase().includes(q.toLowerCase())));
      }
    }
  };

  // --- ACTIONS ---
  const handleRecipeClick = (recipe: Recipe) => {
    setActiveRecipe(recipe);
    setView('DETAILS');
  };

  const toggleSave = async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const isCurrentlySaved = savedRecipes.has(id);
    
    // Optimistic Update
    const newSaved = new Set(savedRecipes);
    if (isCurrentlySaved) newSaved.delete(id);
    else newSaved.add(id);
    setSavedRecipes(newSaved);

    try {
        await api.toggleSave(id, isCurrentlySaved);
    } catch (err) {
        // Revert on fail
        console.error("Failed to save", err);
    }
  };

  const startCooking = () => {
    setCookingStep(0);
    setView('COOKING');
  };

  // --- VIEWS ---

  // 1. HOME VIEW
  const renderHome = () => (
    <main className="pt-16 pb-24 px-4 animate-fadeIn max-w-3xl mx-auto">
      {/* Search Fake Input */}
      <div className="pb-4" onClick={() => setView('SEARCH')}>
        <div className="flex w-full items-center h-14 bg-surfaceHighlight rounded-xl px-4 shadow-sm border border-transparent hover:border-primary/50 transition-colors">
          <Search className="text-textMuted mr-3" size={20} />
          <span className="text-textMuted text-base">Search recipes, ingredients...</span>
        </div>
      </div>

      {/* Chips */}
      <div className="flex gap-3 py-2 overflow-x-auto no-scrollbar -mx-4 px-4">
        <button 
          onClick={() => toggleFilter('Quickest')}
          className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 shadow-lg transition-colors ${
            activeFilter === 'Quickest' 
              ? 'bg-primary text-background shadow-primary/20' 
              : 'bg-surface border border-surfaceHighlight text-white'
          }`}
        >
          <span className={`material-symbols-outlined text-sm font-bold ${activeFilter === 'Quickest' ? 'text-background' : 'text-primary'}`}>⚡</span>
          <p className="text-sm font-bold">Quickest</p>
        </button>

        {['Healthy', 'Low Carb', 'High Protein'].map(tag => (
          <button 
            key={tag} 
            onClick={() => toggleFilter(tag)}
            className={`flex h-10 shrink-0 items-center justify-center rounded-full px-5 border transition-colors ${
              activeFilter === tag 
                ? 'bg-white border-white text-background' 
                : 'bg-surface border-surfaceHighlight text-white'
            }`}
          >
            <p className="text-sm font-medium">{tag}</p>
          </button>
        ))}
      </div>

      {/* Picks */}
      <div className="flex items-center justify-between pt-6 pb-2">
        <h2 className="text-white text-2xl font-bold tracking-tight">
            {activeFilter ? `${activeFilter} Picks` : "Today's Picks"}
        </h2>
        {!activeFilter && <button className="text-primary text-sm font-semibold">See all</button>}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Show all recipes, removed slice(0, 5) limit */}
            {recipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} onClick={handleRecipeClick} />
            ))}
            
            {recipes.length === 0 && (
                <div className="text-center py-10 opacity-60 md:col-span-2">
                    <p>No recipes found.</p>
                </div>
            )}
        </div>
      )}
    </main>
  );

  // 2. SEARCH VIEW
  const renderSearch = () => (
    <div className="min-h-screen bg-background animate-fadeIn">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-surfaceHighlight">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center p-4 justify-between">
          <button onClick={() => setView('HOME')} className="p-2 -ml-2 text-white">
             <ArrowLeft size={24} />
          </button>
          <h2 className="text-white text-lg font-bold flex-1 text-center">Search Recipes</h2>
          <button className="text-primary font-bold text-sm">Clear</button>
        </div>
        <div className="px-4 pb-4">
          <div className="flex w-full items-center h-12 bg-surfaceHighlight rounded-xl px-4 shadow-sm">
            <Search className="text-textMuted mr-3" size={20} />
            <input 
              autoFocus 
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-transparent border-none text-white w-full focus:outline-none placeholder:text-textMuted"
              placeholder="Search recipes..." 
            />
          </div>
        </div>
        </div>
      </header>
      
      <main className="px-4 pb-20 max-w-3xl mx-auto">
        {searchQuery === '' && (
            <section className="mt-4">
            <h3 className="text-white text-lg font-bold mb-3">Recent Searches</h3>
            <div className="flex gap-3 overflow-x-auto no-scrollbar">
                {['Quick Pasta', 'Healthy Tacos', 'Smoothie Bowl'].map(s => (
                <div key={s} onClick={() => handleSearch(s)} className="flex h-10 shrink-0 items-center justify-center px-5 rounded-xl bg-surface border border-surfaceHighlight">
                    <span className="text-white text-sm font-medium">{s}</span>
                </div>
                ))}
            </div>
            </section>
        )}

        <section className="mt-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-lg font-bold">Results ({searchQuery ? searchResults.length : recipes.length})</h3>
                <span className="text-xs font-semibold text-textMuted uppercase tracking-widest">Recommended</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(searchQuery ? searchResults : recipes).map(recipe => (
                   <RecipeCard key={recipe.id} recipe={recipe} onClick={handleRecipeClick} compact />
                ))}
            </div>
        </section>
      </main>
    </div>
  );

  // 3. RECIPE DETAILS VIEW
  const renderDetails = () => {
    if (!activeRecipe) return null;
    const isSaved = savedRecipes.has(activeRecipe.id);
    
    return (
      <div className="min-h-screen bg-background pb-32 animate-fadeIn">
        <div className="max-w-3xl mx-auto">
          {/* Nav */}
          <div className="sticky top-0 z-50 flex items-center bg-background/80 backdrop-blur-md p-4 justify-between border-b border-surfaceHighlight">
          <button onClick={() => setView('HOME')} className="p-2 -ml-2 text-white rounded-full hover:bg-white/10">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-white text-lg font-bold flex-1 text-center">Recipe Details</h2>
          <button className="p-2 -mr-2 text-white">
            <Share2 size={24} />
          </button>
        </div>

        {/* Hero */}
        <div className="w-full aspect-[21/9] relative bg-surfaceHighlight">
          <img src={activeRecipe.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-90"></div>
          <div className="absolute bottom-6 left-6">
             <span className="bg-primary text-background text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                {activeRecipe.tags[1] || activeRecipe.tags[0]}
             </span>
          </div>
        </div>

        <div className="px-4 -mt-4 relative">
            <h1 className="text-white text-3xl font-bold leading-tight mb-2">{activeRecipe.title}</h1>
            
            {/* Trust Block */}
            <div className="flex items-center gap-3 mt-2 mb-6">
                <div className="flex items-center gap-1">
                    <Star size={20} className="text-primary fill-primary" />
                    <span className="text-white text-lg font-bold">{activeRecipe.rating}</span>
                </div>
                <div className="h-1 w-1 rounded-full bg-textMuted"></div>
                <p className="text-textMuted text-sm font-medium">{activeRecipe.cooksThisWeek} cooks this week</p>
            </div>

            {/* Stats Grid */}
            <div className="flex gap-3 mb-6">
                <div className="flex-1 bg-surface border border-surfaceHighlight p-4 rounded-xl">
                    <Clock size={20} className="text-primary mb-1" />
                    <p className="text-textMuted text-[10px] font-bold uppercase tracking-wider">Total Time</p>
                    <p className="text-white text-lg font-bold">{activeRecipe.totalTime} mins</p>
                </div>
                <div className="flex-1 bg-surface border border-surfaceHighlight p-4 rounded-xl">
                    <Users size={20} className="text-primary mb-1" />
                    <p className="text-textMuted text-[10px] font-bold uppercase tracking-wider">Servings</p>
                    <p className="text-white text-lg font-bold">{activeRecipe.servings} ppl</p>
                </div>
                 <div className="flex-1 bg-surface border border-surfaceHighlight p-4 rounded-xl">
                    <span className="text-primary font-bold text-xl mb-1">⚡</span>
                    <p className="text-textMuted text-[10px] font-bold uppercase tracking-wider">Calories</p>
                    <p className="text-white text-lg font-bold">{activeRecipe.nutrition.calories}</p>
                </div>
            </div>

            {/* Nutrition Bar */}
            <div className="bg-surfaceHighlight/40 rounded-xl p-4 flex justify-between items-center mb-8">
                {Object.entries(activeRecipe.nutrition).map(([key, val]) => (
                    key !== 'score' && key !== 'calories' && (
                        <div key={key} className="text-center">
                            <p className="text-white text-base font-bold">{val}g</p>
                            <p className="text-textMuted text-[10px] uppercase font-bold">{key}</p>
                        </div>
                    )
                ))}
                <div className="w-[1px] h-8 bg-surfaceHighlight"></div>
                <div className="text-center">
                    <p className="text-primary text-xl font-bold">{activeRecipe.nutrition.score}</p>
                    <p className="text-textMuted text-[10px] uppercase font-bold">Health</p>
                </div>
            </div>

            {/* Ingredients */}
            <div className="flex justify-between items-end mb-4">
                <h3 className="text-white text-xl font-bold">Ingredients</h3>
                <span className="text-primary text-sm font-bold">Adjust portion</span>
            </div>
            
            <div className="space-y-3 mb-8">
                {activeRecipe.ingredients.map((ing, i) => (
                    <label key={i} className="flex items-center p-4 rounded-xl border border-surfaceHighlight bg-surface cursor-pointer hover:bg-surfaceHighlight transition-colors">
                        <input type="checkbox" className="w-5 h-5 rounded border-textMuted text-primary focus:ring-primary bg-transparent mr-4" />
                        <div className="flex-1">
                            <p className="text-white font-medium">{ing.item}</p>
                            <p className="text-textMuted text-sm">{ing.amount}</p>
                        </div>
                    </label>
                ))}
            </div>
          </div>
        </div>

        {/* Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t border-surfaceHighlight z-50">
            <div className="max-w-3xl mx-auto flex gap-3">
                <button 
                  onClick={startCooking}
                  className="flex-1 bg-primary text-background h-14 rounded-xl flex items-center justify-center gap-2 font-bold text-lg active:scale-95 transition-transform shadow-[0_0_20px_rgba(25,230,111,0.3)]"
                >
                    <PlayCircle fill="currentColor" size={24} /> Start Cooking
                </button>
                <button 
                    onClick={(e) => toggleSave(activeRecipe.id, e)}
                    className={`w-14 h-14 border flex items-center justify-center rounded-xl active:scale-95 transition-transform ${isSaved ? 'bg-white text-background border-white' : 'border-surfaceHighlight text-white'}`}
                >
                    <Bookmark fill={isSaved ? "currentColor" : "none"} size={24} />
                </button>
            </div>
        </div>
      </div>
    );
  };

  // 4. COOKING MODE VIEW
  const renderCooking = () => {
    if (!activeRecipe) return null;
    const step = activeRecipe.steps[cookingStep];
    const totalSteps = activeRecipe.steps.length;
    const progress = ((cookingStep + 1) / totalSteps) * 100;

    return (
      <div className="min-h-screen bg-background flex flex-col font-sans animate-fadeIn">
        <div className="max-w-3xl mx-auto w-full flex flex-col flex-1">
          {/* Header */}
          <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-md">
            <div className="flex items-center p-4 pb-2 justify-between">
                <button onClick={() => setView('DETAILS')} className="p-2 -ml-2 hover:bg-white/10 rounded-full text-white">
                    <X size={24} />
                </button>
                <h2 className="text-white text-lg font-bold flex-1 text-center">Step {cookingStep + 1} of {totalSteps}</h2>
                <button className="p-2 -mr-2 hover:bg-white/10 rounded-full text-white">
                    <Mic size={24} />
                </button>
            </div>
            {/* Progress Bar */}
            <div className="px-4 pb-2">
                <div className="h-1.5 w-full bg-surfaceHighlight rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-primary transition-all duration-500 ease-out shadow-[0_0_10px_rgba(25,230,111,0.8)]"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>

        <main className="flex-1 overflow-y-auto pb-40">
            {/* Image Ref */}
            <div className="px-4 mt-2">
                <div className="relative w-full aspect-video bg-surfaceHighlight rounded-xl overflow-hidden shadow-2xl border border-white/10">
                    <img 
                        src={activeRecipe.image} 
                        className="w-full h-full object-cover opacity-80"
                        alt="Step visual"
                        referrerPolicy="no-referrer"
                    />
                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <p className="text-white/60 font-medium text-sm">Visual reference coming soon</p>
                    </div>
                </div>
            </div>

            {/* Instruction */}
            <div className="px-4 py-8">
                <h1 className="text-white tracking-tight text-3xl font-bold leading-tight mb-4">
                    {step.instruction}
                </h1>
                {step.tip && (
                    <div className="flex gap-3 items-start bg-primary/10 p-4 rounded-xl border border-primary/20">
                        <span className="text-primary text-xl">💡</span>
                        <p className="text-white/80 text-base">{step.tip}</p>
                    </div>
                )}
            </div>

            {/* Timer if needed */}
            {step.durationSeconds && <Timer durationSeconds={step.durationSeconds} />}

          </main>
        </div>

        {/* Footer Nav */}
        <div className="fixed bottom-0 left-0 right-0 p-4 pb-8 bg-gradient-to-t from-background via-background to-transparent">
            <div className="flex gap-4 max-w-3xl mx-auto">
                <button 
                    disabled={cookingStep === 0}
                    onClick={() => setCookingStep(prev => prev - 1)}
                    className="flex-1 h-16 flex items-center justify-center rounded-xl border-2 border-white/10 bg-white/5 text-white font-bold text-lg disabled:opacity-30 active:scale-95 transition-transform"
                >
                    BACK
                </button>
                <button 
                    onClick={() => {
                        if (cookingStep < totalSteps - 1) {
                            setCookingStep(prev => prev + 1);
                        } else {
                            setView('HOME'); // Finish
                        }
                    }}
                    className="flex-[2] h-16 flex items-center justify-center rounded-xl bg-primary text-background font-extrabold text-xl shadow-[0_8px_30px_rgb(25,230,111,0.2)] active:scale-95 transition-transform gap-2"
                >
                    {cookingStep === totalSteps - 1 ? 'FINISH' : 'NEXT STEP'} <ArrowRight size={24} strokeWidth={3} />
                </button>
            </div>
        </div>
      </div>
    );
  };

  // 5. SAVED VIEW
  const renderSaved = () => (
    <div className="min-h-screen bg-background pb-24 animate-fadeIn">
      <div className="max-w-3xl mx-auto">
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md px-4 pt-6 pb-4 border-b border-surfaceHighlight">
            <h1 className="text-white text-3xl font-bold">Saved Recipes</h1>
            
            <div className="flex gap-3 mt-6 overflow-x-auto no-scrollbar">
                <button className="flex h-9 shrink-0 items-center px-4 rounded-xl bg-primary text-background font-bold text-sm">All Recipes</button>
                <button className="flex h-9 shrink-0 items-center px-4 rounded-xl bg-surface border border-surfaceHighlight text-textMuted font-medium text-sm">Under 30 mins</button>
                <button className="flex h-9 shrink-0 items-center px-4 rounded-xl bg-surface border border-surfaceHighlight text-textMuted font-medium text-sm">Healthy</button>
            </div>
        </header>

        <div className="p-4">
            {isLoading ? <Loader2 className="mx-auto animate-spin text-primary"/> : savedRecipes.size === 0 ? (
                <div className="text-center py-20 opacity-50">
                    <Heart size={48} className="mx-auto mb-4 text-textMuted" />
                    <p className="text-white text-lg">No saved recipes yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recipes.filter(r => savedRecipes.has(r.id)).map(recipe => (
                       <div 
                          key={recipe.id}
                          onClick={() => handleRecipeClick(recipe)}
                          className="flex gap-4 bg-surface p-3 rounded-2xl border border-surfaceHighlight items-center cursor-pointer group active:scale-95 transition-transform"
                        >
                            <img src={recipe.image} className="w-20 h-20 rounded-xl object-cover bg-surfaceHighlight" referrerPolicy="no-referrer" />
                            <div className="flex-1">
                                <h4 className="text-white font-bold mb-1">{recipe.title}</h4>
                                <div className="flex gap-2 mb-1">
                                    <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold uppercase">{recipe.tags[0]}</span>
                                </div>
                                <p className="text-textMuted text-xs flex items-center gap-1">
                                    <Clock size={12} /> {recipe.totalTime} mins
                                </p>
                            </div>
                            <button 
                                onClick={(e) => toggleSave(recipe.id, e)}
                                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                            >
                                <Heart fill="currentColor" size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );

  // --- RENDER SWITCHER ---
  return (
    <>
      {/* Top Bar (Only on Home) */}
      {view === 'HOME' && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
          <div className="flex items-center p-4 pb-2 justify-between max-w-3xl mx-auto">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full border-2 border-primary p-0.5">
                  <img src={PROFILE_IMG} className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
               </div>
               <div>
                  <div className="flex items-center gap-1 text-primary mb-0.5">
                     <Crown size={14} strokeWidth={2.5} />
                     <p className="text-[11px] font-bold uppercase tracking-widest">KitchenKing</p>
                  </div>
                  <h2 className="text-white text-lg font-bold leading-none">{COUPLE_NAME}</h2>
               </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-surfaceHighlight flex items-center justify-center text-white">
                <Bell size={20} />
            </button>
          </div>
        </div>
      )}

      {/* View Content */}
      {view === 'HOME' && renderHome()}
      {view === 'SEARCH' && renderSearch()}
      {view === 'DETAILS' && renderDetails()}
      {view === 'COOKING' && renderCooking()}
      {view === 'SAVED' && renderSaved()}

      {/* Bottom Nav (Not on Cooking/Search/Details) */}
      {(view === 'HOME' || view === 'SAVED') && (
        <nav className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-lg border-t border-surfaceHighlight pb-6 pt-3 px-8 z-40">
          <div className="flex justify-between items-center max-w-3xl mx-auto md:px-12">
            <button onClick={() => setView('HOME')} className={`flex flex-col items-center gap-1 ${view === 'HOME' ? 'text-primary' : 'text-textMuted'}`}>
              <Home size={24} strokeWidth={view === 'HOME' ? 3 : 2} />
              <span className="text-[10px] font-bold">TODAY</span>
            </button>
            <button onClick={() => setView('SEARCH')} className="flex flex-col items-center gap-1 text-textMuted">
              <Compass size={24} />
              <span className="text-[10px] font-medium">DISCOVER</span>
            </button>
            <button onClick={() => setView('SAVED')} className={`flex flex-col items-center gap-1 ${view === 'SAVED' ? 'text-primary' : 'text-textMuted'}`}>
              <Heart size={24} fill={view === 'SAVED' ? "currentColor" : "none"} />
              <span className="text-[10px] font-medium">SAVED</span>
            </button>
          </div>
        </nav>
      )}
    </>
  );
}