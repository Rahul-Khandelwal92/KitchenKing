import React from 'react';
import { Recipe } from '../types';
import { Clock, Users, Flame, Star, Award, CheckCircle2 } from 'lucide-react';
import { AVATARS } from '../data';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
  compact?: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick, compact }) => {
  if (compact) {
     return (
        <div 
          onClick={() => onClick(recipe)}
          className="flex bg-surface rounded-2xl overflow-hidden shadow-sm border border-surfaceHighlight mb-4 cursor-pointer active:scale-95 transition-transform"
        >
          <div className="relative w-32 h-32 shrink-0">
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md rounded-lg px-2 py-0.5 flex items-center gap-1">
              <Clock size={14} className="text-primary" />
              <span className="text-white text-[10px] font-bold">{recipe.totalTime} min</span>
            </div>
          </div>
          <div className="flex flex-col justify-center p-4 gap-1">
            <h4 className="text-white font-bold text-base leading-snug">{recipe.title}</h4>
            <p className="text-textMuted text-xs">{recipe.subtitle}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star size={14} className="text-primary fill-primary" />
              <span className="text-white text-xs font-bold">{recipe.rating}</span>
              <span className="text-textMuted text-[10px] ml-1">({recipe.reviewCount}+ reviews)</span>
            </div>
          </div>
        </div>
     );
  }

  return (
    <div 
      onClick={() => onClick(recipe)}
      className="group relative flex flex-col items-stretch justify-start rounded-xl overflow-hidden bg-surface shadow-md mb-6 cursor-pointer active:scale-95 transition-transform"
    >
      <div className="relative w-full aspect-[16/10]">
        <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
            <div className="bg-primary text-background px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                <Clock size={14} />
                {recipe.totalTime} MINS
            </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      
      <div className="flex w-full flex-col gap-2 p-4">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">{recipe.subtitle}</p>
                <h3 className="text-white text-xl font-bold leading-tight">{recipe.title}</h3>
            </div>
        </div>
        
        <div className="flex items-center gap-2 text-textMuted text-sm mt-1">
            {recipe.successRate ? (
                <>
                    <CheckCircle2 size={16} />
                    <p>Beginner friendly • {recipe.successRate}% Success Rate</p>
                </>
            ) : (
                <>
                    <Users size={16} />
                    <p>Cooked by {(recipe.cooksThisWeek / 1000).toFixed(1)}k couples this week</p>
                </>
            )}
        </div>

        <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                    {AVATARS.map((url, i) => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-surface overflow-hidden">
                            <img src={url} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
                <span className="text-xs text-textMuted">{recipe.badges[0] || 'Popular'}</span>
            </div>
            <button className="flex items-center justify-center rounded-xl h-10 px-6 bg-primary text-background text-sm font-bold shadow-sm">
                View Recipe
            </button>
        </div>
      </div>
    </div>
  );
};
