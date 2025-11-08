import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Anime } from '../types/anime';
import { searchAnime } from '../services/api';

interface SearchState {
  query: string;
  results: Anime[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  activeFilter: string;
  advancedFilters: {
    status?: string;
    score?: string;
    year?: string;
    genre?: string;
  };
}

const initialState: SearchState = {
  query: '',
  results: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  hasNextPage: false,
  activeFilter: 'all',
  advancedFilters: {},
};

export const performSearch = createAsyncThunk(
  'search/performSearch',
  async ({ query, page, filter, advancedFilters }: { 
    query: string; 
    page: number; 
    filter?: string;
    advancedFilters?: { status?: string; score?: string; year?: string; genre?: string; };
  }, { signal }) => {
    const response = await searchAnime(query, page, filter, advancedFilters, signal);
    return response;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;
    },
    setAdvancedFilters: (state, action: PayloadAction<{ status?: string; score?: string; year?: string; genre?: string; }>) => {
      state.advancedFilters = action.payload;
    },
    clearResults: (state) => {
      state.results = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.hasNextPage = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(performSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.data;
        state.currentPage = action.payload.pagination.current_page;
        state.totalPages = action.payload.pagination.last_visible_page;
        state.hasNextPage = action.payload.pagination.has_next_page;
      })
      .addCase(performSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Search failed';
      });
  },
});

export const { setQuery, setFilter, setAdvancedFilters, clearResults } = searchSlice.actions;
export default searchSlice.reducer;