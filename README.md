# Anime Search App

A professional React TypeScript application for discovering and exploring anime with advanced filtering capabilities. Built with modern web technologies and enhanced user experience features.

## 🎯 Bonus Implementation

### 🎨 User Experience Enhancements

#### **Browse-First Experience**
- **Immediate Results**: Shows popular anime on page load without requiring search input
- **Filter-First Browsing**: Users can explore anime using filters alone, no search query needed
- **Smart Default Loading**: Displays trending anime ordered by popularity for instant engagement

#### **Advanced Multi-Filter System**
- **Type Filters**: Interactive tabs for TV Series, Movies, OVA, Special with modern tab design
- **Score Filtering**: Comprehensive range from 9.0+ (Excellent) down to <6.0 (Poor) for quality-based discovery
- **Year Filtering**: Complete timeline from 2024 back to <1996 (Classic) for era-based exploration
- **Genre Filtering**: 12 popular genres plus "Others" option that excludes common genres to find unique content
- **Status Filtering**: Currently Airing, Finished Airing, Not Yet Aired for release-based browsing

#### **Enhanced Search Experience**
- **Instant Search**: 250ms debounced search with no button required
- **Clear Functionality**: One-click search clearing with visual feedback
- **Combined Search + Filters**: Search query works seamlessly with all filter combinations
- **Filter Persistence**: All selected filters maintained across pagination and navigation

#### **Professional UI/UX**
- **Skeleton Loaders**: Animated loading placeholders that match actual content layout
- **Smart Error Handling**: Categorized error messages (Network, Rate Limiting, Server) with retry functionality
- **Contextual Empty States**: Different messages for no search results vs. no filter matches
- **Responsive Grid Design**: Mobile-optimized layout with CSS Grid that adapts to screen size
- **Hover Animations**: Smooth card transitions and interactive feedback
- **Clean Modern Design**: Minimal interface with proper spacing, typography, and color scheme

### ⚡ Technical Excellence

#### **Performance Optimization**
- **Race Condition Prevention**: AbortSignal implementation cancels outdated API requests
- **Request Cancellation**: Automatic cancellation when user continues typing
- **Efficient Re-rendering**: Optimized React hooks and state management
- **Debounced API Calls**: Prevents excessive requests while maintaining responsiveness

#### **Code Quality & Architecture**
- **TypeScript Excellence**: Zero 'any' types, comprehensive interfaces for all data structures
- **Clean Redux Architecture**: Proper separation of concerns with Redux Toolkit
- **Component Modularity**: Reusable components with clear responsibilities
- **Error Boundary Implementation**: Graceful error handling throughout the application

#### **Advanced API Integration**
- **Dynamic URL Building**: Smart API parameter construction based on active filters
- **Filter Combination Logic**: Complex filter interactions (genre exclusion, date ranges, score ranges)
- **Pagination Integration**: Server-side pagination that works with all filter combinations
- **API Error Categorization**: Specific handling for different types of API failures

### 🚀 Additional Features

#### **Enhanced Navigation**
- **Deep Linking**: Direct URLs to anime details with proper routing
- **Back Navigation**: Seamless return to search results with state preservation
- **Filter State Management**: All filters maintained across page navigation

#### **Mobile Optimization**
- **Touch-Friendly Interface**: Optimized for mobile interaction
- **Responsive Breakpoints**: Adapts to all screen sizes
- **Mobile-First Design**: Ensures great experience on all devices

#### **Developer Experience**
- **Comprehensive Documentation**: Clear code comments and README
- **Build Optimization**: Production-ready build with code splitting
- **Type Safety**: Full TypeScript coverage with strict configuration

## 🛠️ Tech Stack

- React 18+ with Hooks
- TypeScript 5.2+
- Redux Toolkit
- React Router DOM v6
- Vite (Build Tool)
- Jikan API v4

## 🎯 Core Features

- **Browse & Search**: View popular anime by default or search for specific titles
- **Advanced Filtering**: Multi-dimensional filtering by type, score, year, genre, and status
- **Server-side Pagination**: Efficient navigation through large result sets
- **Detailed Anime Pages**: Comprehensive information including synopsis, scores, genres, and studios
- **Redux State Management**: Centralized state with proper async handling
- **Full TypeScript**: Complete type safety throughout the application
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm (no yarn/pnpm)

### Installation
```bash
# Clone the repository
git clone https://github.com/199993hui/Anime-Search-App.git
cd Anime-Search-App

# Install dependencies
npm install

# Start development server
npm run dev
```

**Application will be available at `http://localhost:4000`**

## 📁 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── SearchBar.tsx       # Debounced search with clear functionality
│   ├── FilterTabs.tsx      # Type filter tabs (TV, Movie, OVA, Special)
│   ├── AdvancedFilters.tsx # Score, Status, Year, Genre filters
│   ├── AnimeCard.tsx       # Anime display card with hover effects
│   ├── SkeletonCard.tsx    # Animated loading placeholders
│   ├── ErrorMessage.tsx    # Categorized error handling with retry
│   └── Pagination.tsx      # Server-side pagination controls
├── pages/                   # Page components
│   ├── SearchPage.tsx      # Main interface with filters and results
│   └── AnimeDetailPage.tsx # Detailed anime information view
├── store/                   # Redux Toolkit state management
│   ├── index.ts            # Store configuration with typed exports
│   ├── searchSlice.ts      # Search state with async thunks
│   └── animeSlice.ts       # Anime details state management
├── services/                # API integration layer
│   └── api.ts              # Jikan API with advanced filtering
├── types/                   # TypeScript definitions
│   └── anime.ts            # Complete anime data interfaces
├── hooks/                   # Custom React hooks
│   └── useDebounce.ts      # 250ms debounce implementation
└── main.tsx                # Application entry point
```

## 🔗 API Integration

Utilizes the [Jikan API v4](https://docs.api.jikan.moe/) - a comprehensive REST API for MyAnimeList data:
- **No Authentication Required**: Free access to extensive anime database
- **Advanced Filtering**: Supports complex query combinations
- **Pagination Support**: Efficient handling of large datasets
- **Rich Data**: Detailed anime information including scores, genres, studios

## 🏗️ Build & Deployment

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

**Build Output**: Optimized bundle (~203KB gzipped) ready for deployment
**Deployment**: Configured for Netlify with SPA routing support