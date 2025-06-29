import { useEffect, useState, useRef } from 'react';
import MovieList from './Components/MovieList';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [openingText, setOpeningText] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const retryIntervalRef = useRef(null);

  async function fetchMovieHandler() {
    try {
      const response = await fetch(
        'https://movies-flix-c8ce1-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json'
      );
      if (!response.ok) throw new Error('Fetch failed');

      const data = await response.json();
      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
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

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!title || !openingText || !releaseDate) return;

    const newMovie = { title, openingText, releaseDate };

    await fetch(
      'https://movies-flix-c8ce1-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json',
      {
        method: 'POST',
        body: JSON.stringify(newMovie),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    fetchMovieHandler();
    setTitle('');
    setOpeningText('');
    setReleaseDate('');
  };

  const handleDeleteMovie = async (id) => {
    await fetch(
      `https://movies-flix-c8ce1-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${id}.json`,
      { method: 'DELETE' }
    );
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f5f5',
      }}
    >
      <form
        onSubmit={submitHandler}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '500px',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Add Movie</h2>

        <label style={{ fontWeight: 'bold' }}>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />

        <label style={{ fontWeight: 'bold' }}>Opening Text</label>
        <textarea
          rows="4"
          value={openingText}
          onChange={(e) => setOpeningText(e.target.value)}
          style={{ ...inputStyle, resize: 'vertical' }}
        />

        <label style={{ fontWeight: 'bold' }}>Release Date</label>
        <input
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            backgroundColor: '#290045',
            color: 'white',
            padding: '0.75rem',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Add Movie
        </button>
      </form>

      <div style={{ marginTop: '3rem', width: '100%', maxWidth: '1000px' }}>
        {loading && <h2 style={styles.centerText}>Loading...</h2>}

        {error && (
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <h2 style={{ color: 'red' }}>{error}</h2>
            <button onClick={cancelRetryHandler} style={styles.button}>
              Cancel
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Movies</h1>
            <MovieList movies={movies} onDelete={handleDeleteMovie} />
          </>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '0.5rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  width: '100%',
};

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
    cursor: 'pointer',
  },
};

export default App;
