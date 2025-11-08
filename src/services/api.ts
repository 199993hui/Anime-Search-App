import { SearchResponse, Anime } from '../types/anime';

const BASE_URL = 'https://api.jikan.moe/v4';

export const searchAnime = async (query: string, page: number = 1, signal?: AbortSignal): Promise<SearchResponse> => {
  const response = await fetch(`${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=20`, { signal });
  if (!response.ok) {
    throw new Error('Failed to fetch anime');
  }
  return response.json();
};

export const getAnimeById = async (id: number): Promise<{ data: Anime }> => {
  const response = await fetch(`${BASE_URL}/anime/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch anime details');
  }
  return response.json();
};