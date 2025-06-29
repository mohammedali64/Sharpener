import React from 'react';
import Movies from './Movies';

const MovieList = ({ movies, onDelete }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
      {movies.map((movie) => (
        <Movies
          key={movie.id}
          id={movie.id}
          title={movie.title}
          openingText={movie.openingText}
          releaseDate={movie.releaseDate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default React.memo(MovieList);
