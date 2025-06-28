import React from 'react';
import Movies from './Movies';


const MovieList = ({ movies }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
      {movies.map((movie) => (
        <Movies
          key={movie.id}
          title={movie.title}
          openingText={movie.openingText}
          releaseDate={movie.releaseDate}
        />
      ))}
    </div>
  );
};

export default MovieList;
