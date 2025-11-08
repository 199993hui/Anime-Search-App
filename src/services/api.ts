import { SearchResponse, Anime } from '../types/anime';

const BASE_URL = 'https://api.jikan.moe/v4';

// Rate limiting helper
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 300; // 300ms between requests

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const searchAnime = async (
  query: string, 
  page: number = 1, 
  filter?: string, 
  advancedFilters?: { status?: string; score?: string; year?: string; genre?: string; },
  signal?: AbortSignal
): Promise<SearchResponse> => {
  // Rate limiting - only delay if requests are too frequent
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (lastRequestTime > 0 && timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await delay(MIN_REQUEST_INTERVAL - timeSinceLastRequest);
  }
  lastRequestTime = Date.now();

  let url;
  
  if (query.trim()) {
    url = `${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=20`;
  } else {
    url = `${BASE_URL}/anime?page=${page}&limit=20&order_by=popularity&sort=asc`;
  }
  
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
  
  try {
    const response = await fetch(url, { 
      signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'AnimeSearchApp/1.0'
      }
    });
    
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please wait a moment before searching again.');
    }
    
    if (response.status >= 500) {
      throw new Error('Server error. The anime database is temporarily unavailable.');
    }
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request cancelled');
      }
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Network error. Please check your internet connection.');
      }
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
};

export const getAnimeById = async (id: number): Promise<{ data: Anime }> => {
  try {
    const response = await fetch(`${BASE_URL}/anime/${id}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'AnimeSearchApp/1.0'
      }
    });
    
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please wait a moment.');
    }
    
    if (response.status >= 500) {
      throw new Error('Server error. Please try again later.');
    }
    
    if (!response.ok) {
      throw new Error(`Failed to fetch anime details: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Network error. Please check your internet connection.');
      }
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
};