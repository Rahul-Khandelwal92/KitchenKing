# KitchenKing: A Case Study

## Overview
**KitchenKing** is a calm, trust-focused cooking app designed specifically for busy couples. It strips away the noise of traditional recipe platforms to provide a streamlined, distraction-free cooking experience with features like one-hand navigation, instant nutrition clarity, and a dedicated cooking mode.

---

## The Problem
Cooking after a long, tiring day can be a stressful chore for busy couples. Traditional recipe apps and websites often exacerbate this stress rather than alleviate it. They are frequently cluttered with intrusive ads, lengthy personal anecdotes, and complex navigation that requires two hands to operate. 

When you are in the middle of cooking, often with messy hands, trying to scroll past a life story to find the next step or locate specific nutritional information becomes a significant hindrance. The cognitive load of managing separate timers, reading small text on a glaring screen, and navigating through unnecessary content adds to the daily fatigue, turning what should be a nourishing activity into a frustrating task.

---

## The Solution
KitchenKing was built to solve these exact pain points by focusing on utility, clarity, and calmness. 

### Key Features & Design Decisions

*   **Distraction-Free "Cooking Mode"**
    A dedicated view that removes all extraneous UI elements. It displays step-by-step instructions in large, highly readable text, keeping the focus entirely on the task at hand.
    
*   **One-Hand Navigation**
    The interface is designed with large, accessible touch targets and intuitive layouts. This allows users to easily swipe through steps or check ingredients using just one hand, which is essential when the other hand is busy prepping food.

*   **Instant Nutrition Clarity**
    Dietary tags (like "High Protein", "Low Carb") and essential nutritional information are presented upfront. Couples can quickly verify if a meal meets their dietary goals without having to dig through paragraphs of text.

*   **Integrated Timers**
    Timers are built directly into the cooking steps. Users can start a timer with a single tap exactly when the recipe calls for it, eliminating the need to switch back and forth between a clock app and the recipe.

*   **Calm, Dark Interface**
    To reduce eye strain and create a relaxing atmosphere in the kitchen, the app utilizes a soothing dark theme with deep greens (`#112118`, `#1c2c24`) and muted text. This contrasts sharply with the glaring white backgrounds of typical recipe sites, promoting a sense of calm.

## Tech Stack
*   **Frontend**: React, Tailwind CSS, Lucide React (Icons)
*   **Backend**: Node.js, Express
*   **Typography**: Lexend (for clean, modern readability)

---

## Screenshots

*Coming soon*

---

## Tradeoffs & Design Decisions

| Decision | What I chose | What I gave up | Why |
|----------|-------------|----------------|-----|
| **Dark calm UI over bright standard** | Deep green dark theme | Familiar light recipe app aesthetic | Reduces eye strain in kitchen environments; creates a calming mood that counters end-of-day fatigue |
| **Cooking Mode (stripped UI) over rich UI** | Distraction-free step view | Rich media, tips, comments | Cognitive load in the kitchen is already high; every extra element is friction |
| **One-hand navigation over feature density** | Large touch targets, minimal taps | More features per screen | Hands are often dirty or occupied while cooking; usability beats feature richness |
| **Integrated timers over linking to clock app** | Native in-step timers | Simpler codebase | Switching apps mid-cook breaks flow; the timer must live where the instruction lives |
| **Upfront nutrition tags over detailed breakdowns** | Summary dietary labels | Full macro tracking | Couples making weeknight decisions need a quick yes/no signal, not a spreadsheet |

---

## What I Learned

- The best cooking UX removes decisions, it doesn't add features. Every design choice was about reducing what the user has to think about mid-cook.
- **One-hand usability** is an underrated constraint; designing for a messy hand forces you to simplify everything else.
- Dark mode isn't just aesthetic; in a kitchen with warm lighting, a dark app is genuinely more comfortable to read at a glance.
