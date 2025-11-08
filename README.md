# Anime Search App

A React TypeScript application for searching and viewing anime details using the Jikan API.

## Features

- **Instant Search**: Debounced search with 250ms delay
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
│   ├── AnimeCard.tsx   # Anime display card
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

- **Responsive Design**: Mobile-friendly layout with CSS Grid
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Proper error messages for failed requests
- **Empty States**: Helpful messages when no results are found
- **Hover Effects**: Interactive card animations
- **Clean UI**: Minimal, modern design with proper spacing
- **TypeScript**: Comprehensive type safety with minimal 'any' usage