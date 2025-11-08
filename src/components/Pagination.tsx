import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { performSearch } from '../store/searchSlice';

export const Pagination = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query, currentPage, totalPages, hasNextPage, activeFilter, advancedFilters } = useSelector(
    (state: RootState) => state.search
  );

  const handlePageChange = (page: number) => {
    dispatch(performSearch({ query, page, filter: activeFilter, advancedFilters }));
  };

  if (totalPages <= 1) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: '8px 16px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: currentPage === 1 ? '#f5f5f5' : 'white',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
        }}
      >
        Previous
      </button>
      
      <span style={{ padding: '8px 16px', alignSelf: 'center' }}>
        Page {currentPage} of {totalPages}
      </span>
      
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage}
        style={{
          padding: '8px 16px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: !hasNextPage ? '#f5f5f5' : 'white',
          cursor: !hasNextPage ? 'not-allowed' : 'pointer',
        }}
      >
        Next
      </button>
    </div>
  );
};