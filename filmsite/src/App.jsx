import { useEffect, useState, useRef } from 'react';
import MovieList from './Components/MovieList';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const retryIntervalRef = useRef(null);

  async function fetchMovieHandler() {
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) throw new Error('Fetch failed');

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => ({
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      }));

      setMovies(transformedMovies);
      setLoading(false);
      setError(null);
      clearInterval(retryIntervalRef.current);
    } catch (err) {
      setError('Something went wrong...Retrying');
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovieHandler();

    retryIntervalRef.current = setInterval(() => {
      fetchMovieHandler();
    }, 5000);

    return () => clearInterval(retryIntervalRef.current); 
  }, []);

  const cancelRetryHandler = () => {
    clearInterval(retryIntervalRef.current);
    setError('Retrying cancelled by user.');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      {loading && <h1 style={styles.centerText}>Loading...</h1>}

      {error && (
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h2 style={{ color: 'red' }}>{error}</h2>
          <button onClick={cancelRetryHandler} style={styles.button}>Cancel</button>
        </div>
      )}

      {!loading && !error && (
        <>
          <h1 style={{ textAlign: 'center', color: '#333' }}>Star Wars Movies</h1>
          <MovieList movies={movies} />
        </>
      )}
    </div>
  );
}

const styles = {
  centerText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default App;
