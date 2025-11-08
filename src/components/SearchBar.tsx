import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setQuery, performSearch, clearResults } from '../store/searchSlice';
import { useDebounce } from '../hooks/useDebounce';

export const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query } = useSelector((state: RootState) => state.search);
  const debouncedQuery = useDebounce(query, 250);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      dispatch(performSearch({ query: debouncedQuery, page: 1 }));
    } else {
      dispatch(clearResults());
    }
  }, [debouncedQuery, dispatch]);

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
    </div>
  );
};