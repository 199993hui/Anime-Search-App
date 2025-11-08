import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setQuery, performSearch, clearResults } from '../store/searchSlice';
import { useDebounce } from '../hooks/useDebounce';

export const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query, activeFilter, advancedFilters } = useSelector((state: RootState) => state.search);
  const debouncedQuery = useDebounce(query, 250);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      dispatch(performSearch({ query: debouncedQuery, page: 1, filter: activeFilter, advancedFilters }));
    } else {
      dispatch(clearResults());
    }
  }, [debouncedQuery, activeFilter, advancedFilters, dispatch]);

  const handleClear = () => {
    dispatch(setQuery(''));
    dispatch(clearResults());
  };

  return (
    <div style={{ marginBottom: '20px', position: 'relative' }}>
      <input
        type="text"
        placeholder="Search for anime..."
        value={query}
        onChange={(e) => dispatch(setQuery(e.target.value))}
        style={{
          width: '100%',
          padding: '12px 50px 12px 12px',
          fontSize: '16px',
          border: '2px solid #ddd',
          borderRadius: '8px',
          outline: 'none',
        }}
      />
      {query && (
        <button
          onClick={handleClear}
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            color: '#666',
            padding: '4px',
            borderRadius: '4px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f0f0f0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};