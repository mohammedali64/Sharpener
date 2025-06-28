import { useEffect, useState } from 'react';
import MovieList from './Components/MovieList';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading,setLoading] = useState(true);

  async function fetchMovieHandler() {
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => ({
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      }));

      setMovies(transformedMovies);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  }

  useEffect(() => {
    fetchMovieHandler();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      {loading && <h1 style={{fontWeight:"bold", justifyContent:"center", alignItems:"center", position:"relative"}}>Loading...</h1>}
      {!loading && <><h1 style={{ textAlign: 'center', color: '#333' }}>Star Wars Movies</h1>
      <MovieList movies={movies} /></>}
    </div>
  );
}

export default App;
