interface ErrorMessageProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ error, onRetry }: ErrorMessageProps) => {
  const getErrorMessage = (error: string) => {
    if (error.includes('Failed to fetch')) {
      return {
        title: 'Network Error',
        message: 'Unable to connect to the server. Please check your internet connection.',
        icon: '🌐'
      };
    }
    if (error.includes('429')) {
      return {
        title: 'Rate Limited',
        message: 'Too many requests. Please wait a moment before searching again.',
        icon: '⏱️'
      };
    }
    if (error.includes('500')) {
      return {
        title: 'Server Error',
        message: 'The anime database is temporarily unavailable. Please try again later.',
        icon: '🔧'
      };
    }
    return {
      title: 'Search Error',
      message: error,
      icon: '❌'
    };
  };

  const errorInfo = getErrorMessage(error);

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '40px',
      backgroundColor: '#fff5f5',
      border: '1px solid #fed7d7',
      borderRadius: '8px',
      margin: '20px 0'
    }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>{errorInfo.icon}</div>
      <h3 style={{ color: '#e53e3e', margin: '0 0 8px 0' }}>{errorInfo.title}</h3>
      <p style={{ color: '#666', margin: '0 0 20px 0' }}>{errorInfo.message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
};