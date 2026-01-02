# Phase 6: Frontend Implementation (Day 3-4) - TODO

**Timeline:** Day 3 (12 hours) + Day 4 (12 hours) = 24 hours total  
**Architecture:** Frontend-Architect (A11y-first, Performance-focused) + Design Skill (Bold aesthetic)  
**Framework:** React 18 + TypeScript + Tailwind CSS + Framer Motion

---

## 📋 Priority & Complexity Matrix

| Phase     | Hour Range    | Priority     | Tasks | Lines    | Est. Time |
| --------- | ------------- | ------------ | ----- | -------- | --------- |
| **Day 3** | **Morning**   | **CRITICAL** | **3** | **~200** | **3h**    |
| **Day 3** | **Afternoon** | **CRITICAL** | **4** | **~300** | **3h**    |
| **Day 3** | **Evening**   | **HIGH**     | **8** | **~500** | **3h**    |
| **Day 4** | **Morning**   | **HIGH**     | **6** | **~400** | **3h**    |
| **Day 4** | **Afternoon** | **HIGH**     | **5** | **~350** | **3h**    |
| **Day 4** | **Evening**   | **MEDIUM**   | **5** | **~300** | **3h**    |

---

## Day 3: Foundation & Infrastructure

### 🎯 Morning: Project Setup & Design System (9:00-12:00)

```
┌─────────────────────────────────┐  ┌──────────────────────────────┐
│ Vite + React Initialize         │  │ Package Dependencies          │
├─────────────────────────────────┤  ├──────────────────────────────┤
│ • Vite scaffold                 │  │ @tanstack/react-query        │
│ • TypeScript strict config      │  │ axios (API client)           │
│ • Root index.tsx + App.tsx      │  │ react-router-dom (routing)   │
└─────────────────────────────────┘  │ framer-motion (animations)   │
                                     │ zod (form validation)        │
┌─────────────────────────────────┐  │ tailwindcss (styling)        │
│ Design Tokens (CSS Variables)   │  └──────────────────────────────┘
├─────────────────────────────────┤
│ • src/index.css with theme      │
│ • Colors, fonts, spacing, etc.  │
│ • Animations (fade, slide, etc.)│
└─────────────────────────────────┘
```

**Todos:**

- [ ] `npm create vite@latest frontend -- --template react-ts`
- [ ] Install 6 core dependencies (react-query, axios, router, framer, zod, tailwind)
- [ ] Configure `tsconfig.json` strict mode + path aliases (`@/`)
- [ ] Create `src/index.css` with design tokens (colors, fonts, spacing, shadows)
- [ ] Import Google Fonts: **Clash Display** (display) + **Satoshi** (body)
- [ ] Configure `tailwind.config.ts` with custom theme
- [ ] Set up `vite.config.ts` with path alias `@/src`
- [ ] Create base layout structure (`src/App.tsx`, `src/main.tsx`)
- [ ] **Git Commit:** `feat: initialize frontend with design system and tokens`

---

### 🎯 Afternoon: Core Infrastructure (13:00-16:00)

```
┌─────────────────────────────┐  ┌─────────────────────────────┐
│ API Client Setup            │  │ State Management            │
├─────────────────────────────┤  ├─────────────────────────────┤
│ • src/api/client.ts         │  │ AuthContext + persistence   │
│ • Axios interceptors        │  │ ToastContext for alerts     │
│ • Token attachment          │  │ React Query config          │
│ • Error handling            │  │ Protected route wrapper     │
└─────────────────────────────┘  └─────────────────────────────┘

┌─────────────────────────────┐
│ Routing + Navigation        │
├─────────────────────────────┤
│ • React Router setup        │
│ • AuthGuard component       │
│ • Public vs protected routes│
│ • 404 fallback              │
└─────────────────────────────┘
```

**Todos:**

- [ ] Create `src/api/client.ts` with Axios instance + interceptors (token, errors)
- [ ] Implement `src/context/AuthContext.tsx`:
  - Login/register/logout functions
  - Token persistence (localStorage)
  - User state management
- [ ] Implement `src/context/ToastContext.tsx` for notifications
- [ ] Set up React Query provider in `src/main.tsx` with sensible defaults
- [ ] Create `src/components/auth/AuthGuard.tsx` for protected routes
- [ ] Configure `src/App.tsx` with React Router:
  - Public routes: `/login`, `/register`
  - Protected routes: `/games`, `/favorites`
  - Redirect `/` to `/games` or `/login` based on auth
- [ ] **Git Commit:** `feat: add infrastructure (API client, auth context, routing)`

---

### 🎯 Evening: Auth Pages & Form Components (17:00-20:00)

```
┌──────────────────────┐  ┌──────────────────────┐
│ Reusable UI Layer    │  │ Auth Form Pages      │
├──────────────────────┤  ├──────────────────────┤
│ Input component      │  │ LoginForm            │
│ Button component     │  │ RegisterForm         │
│ FormError display    │  │ LoginPage layout     │
│ Loading state        │  │ RegisterPage layout  │
└──────────────────────┘  └──────────────────────┘
```

**Design Direction:**  
Bold, minimalist aesthetic with neon accents (cyan/violet). Generous whitespace. Clash Display for headings, Satoshi for body. Clear form hierarchy.

**Todos:**

- [ ] Create `src/components/ui/Input.tsx`:
  - Props: label, error, validation state, onChange
  - Show error message with red highlight
  - Focus ring in cyan
- [ ] Create `src/components/ui/Button.tsx`:
  - Variants: primary (solid), secondary (outline), ghost
  - Loading spinner state
  - Disabled state
- [ ] Create `src/components/auth/LoginForm.tsx`:
  - Email + password inputs
  - Zod validation integration
  - Submit handler (authContext.login)
  - Link to register page
- [ ] Create `src/components/auth/RegisterForm.tsx`:
  - Name + email + password inputs
  - Show password requirements
  - Submit handler (authContext.register)
  - Link to login page
- [ ] Create `src/pages/LoginPage.tsx`:
  - Centered card layout
  - Clash Display heading
  - Form embedded in card
  - Loading/error states
- [ ] Create `src/pages/RegisterPage.tsx`:
  - Match login aesthetic
  - Password strength indicator (optional)
  - Terms link (placeholder)
- [ ] Add form submission loading states
- [ ] **Git Commit:** `feat: implement auth pages with validation and UI components`

---

## Day 4: Feature Complete & Polish

### 🎯 Morning: Games List with Infinite Scroll (9:00-12:00)

```
┌─────────────────────────┐  ┌──────────────────────┐
│ Custom Hooks            │  │ Game Components      │
├─────────────────────────┤  ├──────────────────────┤
│ useGames (infinite Q)   │  │ GameCard             │
│ useInfiniteScroll       │  │ GameSkeleton         │
│ useDebounce             │  │ GameList (grid)      │
│ useFavorites            │  │ EmptyState           │
└─────────────────────────┘  └──────────────────────┘
```

**Todos:**

- [ ] Create `src/hooks/useGames.ts`:
  - Infinite query with React Query
  - Params: filters (type, sport, provider, search, page)
  - Returns: games[], hasMore, fetchNextPage, isLoading
- [ ] Create `src/hooks/useDebounce.ts` for search input debouncing
- [ ] Create `src/hooks/useInfiniteScroll.ts` for scroll trigger detection
- [ ] Create `src/components/games/GameCard.tsx`:
  - Display game details (name, type, sport, provider)
  - Show game image
  - Favorite button (heart icon)
  - Hover effects + animations
- [ ] Create `src/components/games/GameSkeleton.tsx`:
  - Placeholder matching GameCard layout
  - Pulsing animation
- [ ] Create `src/components/games/GameList.tsx`:
  - Responsive grid (1 col mobile, 2 tablet, 3 desktop)
  - Infinite scroll trigger at bottom
  - Loading more spinner
  - Call GameSkeleton while loading
- [ ] Create `src/components/ui/EmptyState.tsx`:
  - Icon + title + message
  - Optional CTA button
- [ ] Create `src/pages/GamesPage.tsx`:
  - GameList + filters at top
  - Responsive sidebar for desktop
- [ ] Wire up infinite scroll observer
- [ ] **Git Commit:** `feat: add games list with infinite scroll and components`

---

### 🎯 Afternoon: Filters & Search (13:00-16:00)

```
┌─────────────────────────┐  ┌──────────────────────┐
│ Filter UI               │  │ Search Integration   │
├─────────────────────────┤  ├──────────────────────┤
│ GameFilter (tabs)       │  │ GameSearch input     │
│ Sport tabs              │  │ Debounce + query     │
│ Provider tabs           │  │ Clear filters button │
│ Reset button            │  │ URL persistence      │
└─────────────────────────┘  └──────────────────────┘
```

**Design Direction:**  
Neon cyan accents for active filters. Tab-based UI. Search with magnifying glass icon.

**Todos:**

- [ ] Create `src/components/games/GameFilter.tsx`:
  - Tabs: All / Sports / Casino
  - Sport selector (Cricket, Football, Tennis)
  - Provider selector (Evolution, Pragmatic, Betsoft)
  - Styled buttons with active state (cyan underline)
  - Reset filters button
- [ ] Create `src/components/games/GameSearch.tsx`:
  - Text input with debounce (300ms)
  - Search icon in input
  - Clear button when text exists
- [ ] Implement URL query param sync:
  - Read params on mount
  - Update params on filter change
  - Preserve filters on navigation
- [ ] Wire filters to `useGames` hook
- [ ] Add visual feedback (badge count on active filters)
- [ ] **Git Commit:** `feat: implement game filtering and search with URL sync`

---

### 🎯 Evening: Favorites & Polish (17:00-20:00)

```
┌──────────────────────────┐  ┌──────────────────────┐
│ Favorites Logic          │  │ Favorites UI         │
├──────────────────────────┤  ├──────────────────────┤
│ useFavorites hook        │  │ FavoriteButton       │
│ Optimistic updates       │  │ FavoritesPage        │
│ Error recovery           │  │ Favorites grid       │
└──────────────────────────┘  └──────────────────────┘
```

**Todos:**

- [ ] Create `src/hooks/useFavorites.ts`:
  - GET /api/favorites
  - POST /api/favorites/:gameId
  - DELETE /api/favorites/:gameId
  - Optimistic updates (instant UI feedback)
  - Error recovery
- [ ] Create `src/components/favorites/FavoriteButton.tsx`:
  - Heart icon (outline / filled)
  - Click handler with optimistic update
  - Loading spinner
  - Tooltip on hover
  - Animation on toggle
- [ ] Create `src/pages/FavoritesPage.tsx`:
  - Display user's favorites in grid
  - Empty state when no favorites
  - Remove button on each card
  - Toast on add/remove
- [ ] Wire FavoriteButton into GameCard
- [ ] Add toast notifications (success/error)
- [ ] Test add/remove flow
- [ ] **Git Commit:** `feat: add favorites with optimistic updates and toast notifications`

---

### 🎯 Night: Accessibility & Responsive Design (20:00-23:00)

```
┌──────────────────────────┐  ┌──────────────────────┐
│ Accessibility (WCAG AA)  │  │ Responsive Design    │
├──────────────────────────┤  ├──────────────────────┤
│ Keyboard navigation      │  │ Mobile nav (burger)  │
│ Focus indicators (cyan)  │  │ Tablet layout        │
│ Screen reader labels     │  │ Desktop grid         │
│ Color contrast 4.5:1     │  │ Touch targets 44px   │
│ Error associations       │  │ Viewport meta        │
└──────────────────────────┘  └──────────────────────┘
```

**Todos:**

- [ ] **Keyboard Navigation:**
  - Tab through all buttons/inputs
  - Enter to submit forms
  - Escape to close modals
  - Arrow keys in filter tabs
- [ ] **Focus Indicators:**
  - Cyan ring on all interactive elements
  - Visible on keyboard nav
  - Hidden on mouse click
- [ ] **Screen Reader Support:**
  - Add `aria-label` to icon buttons
  - Add `aria-live` to toast notifications
  - Form error `aria-describedby`
  - Loading state announcements
- [ ] **Color Contrast:**
  - Verify text ≥ 4.5:1 WCAG AA
  - Test with contrast checker
- [ ] **Responsive Breakpoints:**
  - Mobile (< 640px): single column, burger menu
  - Tablet (640px - 1024px): 2 columns
  - Desktop (> 1024px): 3 columns + sidebar
- [ ] **Mobile-First Polish:**
  - Touch targets ≥ 44px (buttons, inputs)
  - Readable font sizes (≥ 16px on mobile)
  - Adequate spacing between interactive elements
  - Viewport meta tag configured
- [ ] **Performance Audit (Lighthouse):**
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
  - Fix any critical issues
- [ ] Remove console errors/warnings
- [ ] **Git Commit:** `feat: add accessibility and responsive design (WCAG AA)`

---

## Acceptance Criteria by Priority

### 🔴 Critical (Must Have)

| Feature                       | Status | Notes                      |
| ----------------------------- | ------ | -------------------------- |
| Login/Register pages working  | [ ]    | JWT token persisted        |
| Games list displays 39 games  | [ ]    | Infinite scroll functional |
| Filter by type/sport/provider | [ ]    | Query params synced        |
| Search with debounce          | [ ]    | Case-insensitive           |
| Add/remove favorites          | [ ]    | Toast feedback             |
| Protected routes (authguard)  | [ ]    | Redirect to login          |
| Responsive on mobile          | [ ]    | Touch-friendly             |

### 🟡 High (Should Have)

| Feature                  | Status | Notes                  |
| ------------------------ | ------ | ---------------------- |
| Loading skeletons        | [ ]    | Matches card layout    |
| Empty states             | [ ]    | Helpful messages       |
| Error handling           | [ ]    | User-friendly messages |
| Keyboard navigation      | [ ]    | Tab + enter work       |
| Focus indicators visible | [ ]    | Cyan ring on focus     |
| Lighthouse > 80          | [ ]    | Performance checked    |

### 🟢 Nice-to-Have (Can Have)

| Feature               | Status | Notes              |
| --------------------- | ------ | ------------------ |
| Dark mode toggle      | [ ]    | Optional           |
| Filter persistence    | [ ]    | Session storage    |
| Favorites count badge | [ ]    | On header          |
| Animation polish      | [ ]    | Micro-interactions |
| Offline detection     | [ ]    | Service worker     |

---

## Design Aesthetic Direction

**Name:** "Neon Minimalist"

| Element             | Choice                           | Notes                        |
| ------------------- | -------------------------------- | ---------------------------- |
| **Display Font**    | Clash Display (Bold, geometric)  | Headings, CTAs               |
| **Body Font**       | Satoshi (Geometric, friendly)    | Body text, labels            |
| **Primary Color**   | Cyan (#06B6D4)                   | Accent, active states, focus |
| **Secondary Color** | Violet (#8B5CF6)                 | Hover effects, highlights    |
| **Background**      | Near-white (#F8FAFC)             | Light mode default           |
| **Text**            | Slate-900 (#0F172A)              | Primary text                 |
| **Spacing**         | 8px scale (4, 8, 12, 16, 24, 32) | Consistent rhythm            |
| **Shadows**         | Minimal, cyan-tinted             | Focus rings, elevation       |
| **Border Radius**   | 12px (buttons), 8px (cards)      | Modern, not too rounded      |
| **Motion**          | Fade + slide (200ms easing)      | Framer Motion variants       |

---

## Code Organization (Tree)

```
src/
├── api/
│   ├── client.ts                 # Axios instance + interceptors
│   ├── auth.api.ts              # Auth endpoints
│   ├── games.api.ts             # Games endpoints
│   └── favorites.api.ts         # Favorites endpoints
├── components/
│   ├── ui/
│   │   ├── Button.tsx           # Variants: primary, secondary, ghost
│   │   ├── Input.tsx            # Form input with validation
│   │   ├── Card.tsx             # Game card container
│   │   ├── EmptyState.tsx       # No data placeholder
│   │   └── Spinner.tsx          # Loading indicator
│   ├── auth/
│   │   ├── LoginForm.tsx        # Email + password form
│   │   ├── RegisterForm.tsx     # Name + email + password form
│   │   └── AuthGuard.tsx        # Protected route wrapper
│   ├── games/
│   │   ├── GameCard.tsx         # Individual game display
│   │   ├── GameList.tsx         # Grid with infinite scroll
│   │   ├── GameFilter.tsx       # Sport/provider filter tabs
│   │   ├── GameSearch.tsx       # Debounced search input
│   │   └── GameSkeleton.tsx     # Loading placeholder
│   └── favorites/
│       ├── FavoriteButton.tsx   # Heart icon with animation
│       └── FavoritesPage.tsx    # User favorites grid
├── context/
│   ├── AuthContext.tsx          # User state + token management
│   └── ToastContext.tsx         # Notification state
├── hooks/
│   ├── useAuth.ts               # Login/register/logout
│   ├── useGames.ts              # Infinite query games
│   ├── useFavorites.ts          # Favorites CRUD
│   ├── useDebounce.ts           # Debounce utility
│   └── useInfiniteScroll.ts     # Scroll trigger
├── pages/
│   ├── LoginPage.tsx            # /login
│   ├── RegisterPage.tsx         # /register
│   ├── GamesPage.tsx            # /games
│   └── FavoritesPage.tsx        # /favorites
├── types/
│   ├── index.ts                 # Shared interfaces
│   └── api.types.ts             # API response types
├── styles/
│   └── globals.css              # Design tokens + animations
├── App.tsx                      # Router setup
├── main.tsx                     # React entry + providers
└── index.css                    # Tailwind + CSS variables
```

---

## Total Estimate

| Day   | Phase     | Hours   | Status            |
| ----- | --------- | ------- | ----------------- |
| **3** | Morning   | 3h      | Setup + Design    |
| **3** | Afternoon | 3h      | Infrastructure    |
| **3** | Evening   | 3h      | Auth Pages        |
| **4** | Morning   | 3h      | Games List        |
| **4** | Afternoon | 3h      | Filters + Search  |
| **4** | Evening   | 3h      | Favorites + A11y  |
|       | **TOTAL** | **18h** | ✅ Frontend Ready |

**Buffer:** 6 hours for testing, fixes, iterations

---

## Success Metrics

✅ All 7 critical features working  
✅ WCAG AA accessibility compliance  
✅ Lighthouse performance > 80  
✅ Responsive on mobile/tablet/desktop  
✅ Zero console errors  
✅ Clean git history with 6 commits  
✅ README updated with frontend setup
