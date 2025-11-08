import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { performSearch, restoreCachedState } from '../store/searchSlice';
import { SearchBar } from '../components/SearchBar';
import { FilterTabs } from '../components/FilterTabs';
import { AdvancedFilters } from '../components/AdvancedFilters';
import { AnimeCard } from '../components/AnimeCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { ErrorMessage } from '../components/ErrorMessage';
import { Pagination } from '../components/Pagination';

export const SearchPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { results, loading, error, query, activeFilter, advancedFilters, cachedState } = useSelector((state: RootState) => state.search);

  useEffect(() => {
    // Restore cached state if returning from detail page
    if (cachedState) {
      dispatch(restoreCachedState());
      return;
    }
    // Load initial results on page load
    dispatch(performSearch({ query, page: 1, filter: activeFilter, advancedFilters }));
  }, [dispatch, cachedState]);

  useEffect(() => {
    // Refresh results when cached state is restored
    if (!cachedState) {
      const hasFilters = query.trim() || activeFilter !== 'all' || Object.values(advancedFilters).some(v => v);
      if (hasFilters && results.length === 0 && !loading) {
        dispatch(performSearch({ query, page: 1, filter: activeFilter, advancedFilters }));
      }
    }
  }, [query, activeFilter, advancedFilters, results.length, loading, dispatch, cachedState]);

  const handleRetry = () => {
    dispatch(performSearch({ query, page: 1, filter: activeFilter, advancedFilters }));
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Anime Search</h1>
      
      <SearchBar />
      
      <FilterTabs />
      
      <AdvancedFilters />
      
      {loading && (
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
      
      {error && (
        <ErrorMessage error={error} onRetry={handleRetry} />
      )}
      
      {!loading && !error && results.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          {query.trim() ? `No anime found for "${query}"` : 'No anime found with current filters'}
        </div>
      )}
      
      {!loading && !error && results.length > 0 && (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '20px',
              marginBottom: '20px',
            }}
          >
            {results.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
          
          <Pagination />
        </>
      )}
    </div>
  );
};