import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setFilter, performSearch } from '../store/searchSlice';

const FILTER_OPTIONS = [
  { key: 'all', label: 'All', param: '' },
  { key: 'tv', label: 'TV Series', param: 'tv' },
  { key: 'movie', label: 'Movies', param: 'movie' },
  { key: 'ova', label: 'OVA', param: 'ova' },
  { key: 'special', label: 'Special', param: 'special' },
];

export const FilterTabs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query, activeFilter } = useSelector((state: RootState) => state.search);

  const handleFilterChange = (filterKey: string) => {
    dispatch(setFilter(filterKey));
    if (query.trim()) {
      dispatch(performSearch({ query, page: 1, filter: filterKey }));
    }
  };

  if (!query.trim()) return null;

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ 
        display: 'flex', 
        gap: '4px', 
        borderBottom: '1px solid #ddd',
        overflowX: 'auto',
        paddingBottom: '0'
      }}>
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option.key}
            onClick={() => handleFilterChange(option.key)}
            style={{
              padding: '12px 20px',
              border: 'none',
              borderBottom: activeFilter === option.key ? '3px solid #007bff' : '3px solid transparent',
              backgroundColor: activeFilter === option.key ? '#f8f9fa' : 'transparent',
              color: activeFilter === option.key ? '#007bff' : '#666',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeFilter === option.key ? '600' : '400',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (activeFilter !== option.key) {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
                e.currentTarget.style.color = '#333';
              }
            }}
            onMouseLeave={(e) => {
              if (activeFilter !== option.key) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#666';
              }
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};