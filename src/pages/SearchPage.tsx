import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { performSearch } from '../store/searchSlice';
import { SearchBar } from '../components/SearchBar';
import { FilterTabs } from '../components/FilterTabs';
import { AnimeCard } from '../components/AnimeCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { ErrorMessage } from '../components/ErrorMessage';
import { Pagination } from '../components/Pagination';

export const SearchPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { results, loading, error, query, activeFilter } = useSelector((state: RootState) => state.search);

  const handleRetry = () => {
    if (query.trim()) {
      dispatch(performSearch({ query, page: 1, filter: activeFilter }));
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Anime Search</h1>
      
      <SearchBar />
      
      <FilterTabs />
      
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
      
      {!loading && !error && query.trim() && results.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          No anime found for "{query}"
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
      
      {!query.trim() && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          Start typing to search for anime...
        </div>
      )}
    </div>
  );
};