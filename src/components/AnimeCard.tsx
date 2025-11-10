import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { cacheCurrentState } from '../store/searchSlice';
import { Anime } from '../types/anime';

interface AnimeCardProps {
  anime: Anime;
}

export const AnimeCard = ({ anime }: AnimeCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(cacheCurrentState());
  };

  return (
    <Link
      to={`/anime/${anime.mal_id}`}
      onClick={handleClick}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <img
        src={anime.images.jpg.image_url}
        alt={anime.title}
        style={{
          width: '100%',
          height: '300px',
          objectFit: 'cover',
          borderRadius: '4px',
          marginBottom: '12px',
        }}
      />
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{anime.title}</h3>
      {anime.score && (
        <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
          Score: {anime.score}/10
        </p>
      )}
    </Link>
  );
};