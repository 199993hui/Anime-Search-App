export const SkeletonCard = () => {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        animation: 'pulse 1.5s ease-in-out infinite alternate',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '300px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          marginBottom: '12px',
        }}
      />
      <div
        style={{
          height: '20px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          marginBottom: '8px',
        }}
      />
      <div
        style={{
          height: '16px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          width: '60%',
        }}
      />
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            100% { opacity: 0.6; }
          }
        `}
      </style>
    </div>
  );
};