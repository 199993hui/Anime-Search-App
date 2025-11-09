import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { performSearch } from '../store/searchSlice';
import { searchAnime } from '../services/api';
import { Anime } from '../types/anime';
import { SearchBar } from '../components/SearchBar';
import { FilterTabs } from '../components/FilterTabs';
import { AdvancedFilters } from '../components/AdvancedFilters';
import { AnimeCard } from '../components/AnimeCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { ErrorMessage } from '../components/ErrorMessage';
import { Pagination } from '../components/Pagination';

export const SearchPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { results, loading, error, query, activeFilter, advancedFilters } = useSelector((state: RootState) => state.search);
  const [fallbackResults, setFallbackResults] = useState<Anime[]>([]);
  const [fallbackLoading, setFallbackLoading] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        dispatch(performSearch({ query: '', page: 1, filter: 'all', advancedFilters: {} }));
        
        // Fallback direct API call
        setTimeout(async () => {
          if (results.length === 0 && error) {
            setFallbackLoading(true);
            try {
              const response = await searchAnime('', 1);
              setFallbackResults(response.data);
            } catch (e) {
              console.error('Fallback failed:', e);
            }
            setFallbackLoading(false);
          }
        }, 1000);
      } catch (e) {
        console.error('Initial load failed:', e);
      }
    };
    
    loadInitialData();
  }, [dispatch]);

  const handleRetry = async () => {
    dispatch(performSearch({ query, page: 1, filter: activeFilter, advancedFilters }));
    
    // Also try direct API call
    try {
      setFallbackLoading(true);
      const response = await searchAnime(query, 1, activeFilter, advancedFilters);
      setFallbackResults(response.data);
      setFallbackLoading(false);
    } catch (e) {
      setFallbackLoading(false);
    }
  };

  // Use fallback results if Redux results are empty and there's an error
  const displayResults = results.length > 0 ? results : fallbackResults;
  const displayLoading = loading || fallbackLoading;
  const displayError = error && displayResults.length === 0;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Anime Search</h1>
      
      <SearchBar />
      
      <FilterTabs />
      
      <AdvancedFilters />
      
      {displayLoading && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '20px',
          }}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}
      
      {displayError && (
        <ErrorMessage error={error} onRetry={handleRetry} />
      )}
      
      {!displayLoading && !displayError && displayResults.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          {query.trim() ? `No anime found for "${query}"` : 'No anime found with current filters'}
        </div>
      )}
      
      {!displayLoading && displayResults.length > 0 && (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '20px',
              marginBottom: '20px',
            }}
          >
            {displayResults.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
          
          {results.length > 0 && <Pagination />}
        </>
      )}
    </div>
  );
};