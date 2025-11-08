import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Anime } from '../types/anime';
import { getAnimeById } from '../services/api';

interface AnimeState {
  currentAnime: Anime | null;
  loading: boolean;
  error: string | null;
}

const initialState: AnimeState = {
  currentAnime: null,
  loading: false,
  error: null,
};

export const fetchAnimeById = createAsyncThunk(
  'anime/fetchById',
  async (id: number) => {
    const response = await getAnimeById(id);
    return response.data;
  }
);

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    clearCurrentAnime: (state) => {
      state.currentAnime = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAnime = action.payload;
      })
      .addCase(fetchAnimeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch anime details';
      });
  },
});

export const { clearCurrentAnime } = animeSlice.actions;
export default animeSlice.reducer;