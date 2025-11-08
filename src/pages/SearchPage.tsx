import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { SearchBar } from '../components/SearchBar';
import { AnimeCard } from '../components/AnimeCard';
import { Pagination } from '../components/Pagination';

export const SearchPage = () => {
  const { results, loading, error, query } = useSelector((state: RootState) => state.search);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Anime Search</h1>
      
      <SearchBar />
      
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div>Loading...</div>
        </div>
      )}
      
      {error && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>
          Error: {error}
        </div>
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