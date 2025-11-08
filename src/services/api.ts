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
      if (advancedFilters.score === '<6') {
        url += `&max_score=5.99`;
      } else {
        url += `&min_score=${advancedFilters.score}`;
      }
    }
    if (advancedFilters.year) {
      if (advancedFilters.year === '<1996') {
        url += `&end_date=1995-12-31`;
      } else {
        url += `&start_date=${advancedFilters.year}-01-01&end_date=${advancedFilters.year}-12-31`;
      }
    }
    if (advancedFilters.genre) {
      if (advancedFilters.genre === 'others') {
        url += `&genres_exclude=1,2,4,8,10,14,22,24,30,36,37,41`;
      } else {
        url += `&genres=${advancedFilters.genre}`;
      }
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