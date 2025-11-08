# Anime Search App

A React TypeScript application for searching and viewing anime details using the Jikan API.

## Features

- **Instant Search**: Debounced search with 250ms delay
- **Advanced Filters**: Score, Status, Year, and Genre filtering
- **Server-side Pagination**: Navigate through search results
- **Anime Details**: Comprehensive anime information page
- **Redux State Management**: Centralized state with Redux Toolkit
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit
- React Router DOM
- Vite
- Jikan API

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:4000`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SearchBar.tsx   # Search input with debouncing
│   ├── FilterTabs.tsx  # Type filter tabs
│   ├── AdvancedFilters.tsx # Advanced filter controls
│   ├── AnimeCard.tsx   # Anime display card
│   ├── SkeletonCard.tsx # Loading skeleton
│   ├── ErrorMessage.tsx # Error handling
│   └── Pagination.tsx  # Pagination controls
├── pages/              # Page components
│   ├── SearchPage.tsx  # Main search interface
│   └── AnimeDetailPage.tsx # Anime details view
├── store/              # Redux store and slices
│   ├── index.ts        # Store configuration
│   ├── searchSlice.ts  # Search state management
│   └── animeSlice.ts   # Anime details state
├── services/           # API services
│   └── api.ts          # Jikan API integration
├── types/              # TypeScript type definitions
│   └── anime.ts        # Anime data interfaces
├── hooks/              # Custom React hooks
│   └── useDebounce.ts  # Debounce hook
└── main.tsx           # Application entry point
```

## API

This application uses the [Jikan API](https://docs.api.jikan.moe/) - a free REST API for anime and manga data from MyAnimeList.

## Build

To build the application for production:

```bash
npm run build
```

## Bonus Implementation

### User Experience Enhancements:
- **Filter Tabs**: Interactive tabs for anime types (TV, Movies, OVA, Special)
- **Advanced Filters**: Score (9.0+ to <6.0), Status, Year (2024 to <1996), Genre (including "Others")
- **Clear Search**: One-click search clearing functionality
- **Skeleton Loaders**: Animated loading placeholders matching content layout
- **Enhanced Error Handling**: Specific error messages with retry functionality
- **Empty States**: Contextual messages for no results and initial state
- **Responsive Design**: Mobile-friendly layout with CSS Grid
- **Clean Modern UI**: Minimal design with proper spacing and typography

### Technical Excellence:
- **Race Condition Handling**: AbortSignal implementation prevents outdated API responses
- **Request Cancellation**: Automatic cancellation of previous requests when user continues typing
- **Proper Error Categorization**: Network, rate limiting, and server error detection with appropriate user messaging
- **TypeScript Excellence**: Comprehensive type safety with zero 'any' types, proper interfaces for all data structures
- **Performance Optimization**: Debounced search, efficient re-rendering, and optimized API calls
- **State Management**: Clean Redux architecture with proper separation of concerns

### Additional Features:
- **Comprehensive Filtering**: All filters work together seamlessly (type + score + year + genre + status)
- **Filter Persistence**: All filters maintained across pagination and navigation
- **Loading State Management**: Proper loading states for all async operations
- **Mobile Optimization**: Touch-friendly interface with responsive breakpoints