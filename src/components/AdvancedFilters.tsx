import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setAdvancedFilters, performSearch } from '../store/searchSlice';

const STATUS_OPTIONS = [
  { value: '', label: 'Any Status' },
  { value: 'airing', label: 'Currently Airing' },
  { value: 'complete', label: 'Finished Airing' },
  { value: 'upcoming', label: 'Not Yet Aired' },
];

const SCORE_OPTIONS = [
  { value: '', label: 'Any Score' },
  { value: '9', label: '9.0+ (Excellent)' },
  { value: '8', label: '8.0+ (Very Good)' },
  { value: '7', label: '7.0+ (Good)' },
  { value: '6', label: '6.0+ (Fair)' },
  { value: '<6', label: '< 6.0 (Poor)' },
];

const GENRE_OPTIONS = [
  { value: '1', label: 'Action' },
  { value: '2', label: 'Adventure' },
  { value: '4', label: 'Comedy' },
  { value: '8', label: 'Drama' },
  { value: '10', label: 'Fantasy' },
  { value: '14', label: 'Horror' },
  { value: '22', label: 'Romance' },
  { value: '24', label: 'Sci-Fi' },
  { value: '36', label: 'Slice of Life' },
  { value: '30', label: 'Sports' },
  { value: '37', label: 'Supernatural' },
  { value: '41', label: 'Thriller' },
  { value: 'others', label: 'Others' },
];

export const AdvancedFilters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query, advancedFilters } = useSelector((state: RootState) => state.search);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...advancedFilters, [key]: value };
    dispatch(setAdvancedFilters(newFilters));
    
    if (query.trim()) {
      dispatch(performSearch({ query, page: 1, advancedFilters: newFilters }));
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  if (!query.trim()) return null;

  return (
    <div style={{ 
      backgroundColor: '#f8f9fa', 
      padding: '16px', 
      borderRadius: '8px', 
      marginBottom: '20px',
      border: '1px solid #e9ecef'
    }}>
      <h4 style={{ margin: '0 0 16px 0', color: '#495057', fontSize: '14px' }}>Advanced Filters</h4>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px' 
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', color: '#6c757d' }}>
            Status
          </label>
          <select
            value={advancedFilters.status || ''}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          >
            {STATUS_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', color: '#6c757d' }}>
            Minimum Score
          </label>
          <select
            value={advancedFilters.score || ''}
            onChange={(e) => handleFilterChange('score', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          >
            {SCORE_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', color: '#6c757d' }}>
            Year
          </label>
          <select
            value={advancedFilters.year || ''}
            onChange={(e) => handleFilterChange('year', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          >
            <option value="">Any Year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
            <option value="<1996">&lt; 1996 (Classic)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', color: '#6c757d' }}>
            Genre
          </label>
          <select
            value={advancedFilters.genre || ''}
            onChange={(e) => handleFilterChange('genre', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          >
            <option value="">Any Genre</option>
            {GENRE_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};