import React from 'react';

const Movies = ({ id, title, openingText, releaseDate, onDelete }) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        width: '300px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ color: '#007bff', fontSize: '1.5rem' }}>{title}</h2>
      <p style={{ fontSize: '0.9rem', color: '#444' }}>{openingText}</p>
      <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>Release Date: {releaseDate}</p>
      <button
        onClick={() => onDelete(id)}
        style={{
          marginTop: '1rem',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default React.memo(Movies);
