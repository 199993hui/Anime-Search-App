import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchAnimeById } from '../store/animeSlice';

export const AnimeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { currentAnime, loading, error } = useSelector((state: RootState) => state.anime);

  useEffect(() => {
    if (id) {
      dispatch(fetchAnimeById(Number(id)));
    }
  }, [id, dispatch]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
        <div>Loading anime details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
        <div style={{ color: 'red', marginBottom: '20px' }}>Error: {error}</div>
        <button 
          onClick={handleBackClick}
          style={{ 
            color: '#007bff', 
            textDecoration: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          ← Back to Search
        </button>
      </div>
    );
  }

  if (!currentAnime) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
        <div>Anime not found</div>
        <button 
          onClick={handleBackClick}
          style={{ 
            color: '#007bff', 
            textDecoration: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          ← Back to Search
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <button 
        onClick={handleBackClick}
        style={{ 
          color: '#007bff', 
          textDecoration: 'none', 
          marginBottom: '20px', 
          display: 'inline-block',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        ← Back to Search
      </button>
      
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <img
          src={currentAnime.images.jpg.large_image_url}
          alt={currentAnime.title}
          style={{ width: '300px', height: 'auto', borderRadius: '8px' }}
        />
        
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h1 style={{ margin: '0 0 10px 0' }}>{currentAnime.title}</h1>
          
          {currentAnime.title_english && currentAnime.title_english !== currentAnime.title && (
            <h2 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#666' }}>
              {currentAnime.title_english}
            </h2>
          )}
          
          {currentAnime.title_japanese && (
            <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', color: '#888' }}>
              {currentAnime.title_japanese}
            </h3>
          )}
          
          <div style={{ marginBottom: '20px' }}>
            {currentAnime.score && (
              <p><strong>Score:</strong> {currentAnime.score}/10</p>
            )}
            {currentAnime.episodes && (
              <p><strong>Episodes:</strong> {currentAnime.episodes}</p>
            )}
            {currentAnime.status && (
              <p><strong>Status:</strong> {currentAnime.status}</p>
            )}
            {currentAnime.aired?.from && (
              <p><strong>Aired:</strong> {new Date(currentAnime.aired.from).getFullYear()}</p>
            )}
          </div>
          
          {currentAnime.genres && currentAnime.genres.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <strong>Genres:</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                {currentAnime.genres.map((genre) => (
                  <span
                    key={genre.mal_id}
                    style={{
                      backgroundColor: '#f0f0f0',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '14px',
                    }}
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {currentAnime.studios && currentAnime.studios.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <strong>Studios:</strong> {currentAnime.studios.map(s => s.name).join(', ')}
            </div>
          )}
        </div>
      </div>
      
      {currentAnime.synopsis && (
        <div style={{ marginTop: '30px' }}>
          <h3>Synopsis</h3>
          <p style={{ lineHeight: '1.6', color: '#333' }}>{currentAnime.synopsis}</p>
        </div>
      )}
    </div>
  );
};