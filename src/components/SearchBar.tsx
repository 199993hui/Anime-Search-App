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
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Search for anime..."
        value={query}
        onChange={(e) => dispatch(setQuery(e.target.value))}
        style={{
          width: '100%',
          padding: '12px',
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
            marginTop: '8px',
            padding: '6px 12px',
            backgroundColor: '#f8f9fa',
            border: '1px solid #dee2e6',
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer',
            color: '#6c757d',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e9ecef';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f8f9fa';
          }}
        >
          Clear
        </button>
      )}
    </div>
  );
};