import { SearchResponse, Anime } from '../types/anime';

const BASE_URL = 'https://api.jikan.moe/v4';

export const searchAnime = async (
  query: string, 
  page: number = 1, 
  filter?: string, 
  advancedFilters?: { status?: string; score?: string; year?: string; genre?: string; },
  signal?: AbortSignal
): Promise<SearchResponse> => {
  let url = `${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=20`;
  
  if (filter && filter !== 'all') {
    url += `&type=${filter}`;
  }
  
  if (advancedFilters) {
    if (advancedFilters.status) {
      url += `&status=${advancedFilters.status}`;
    }
    if (advancedFilters.score) {
      url += `&min_score=${advancedFilters.score}`;
    }
    if (advancedFilters.year) {
      url += `&start_date=${advancedFilters.year}-01-01&end_date=${advancedFilters.year}-12-31`;
    }
    if (advancedFilters.genre) {
      url += `&genres=${advancedFilters.genre}`;
    }
  }
  
  const response = await fetch(url, { signal });
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