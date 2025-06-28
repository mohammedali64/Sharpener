import { useEffect, useState, useRef } from 'react';
import MovieList from './Components/MovieList';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title,setTitle] = useState('');
  const [openingText,setOpeningText] = useState('');
  const [releaseDate,setReleaseDate] = useState('');
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

  const submitHandler = (event)=>{
    event.preventDefault();
    const newMovie = {
      id: Math.random(),
      title:title,
      openingText:openingText,
      releaseDate:releaseDate
      }
      console.log(newMovie);
      const updatedMovies = [...movies,newMovie];
      setMovies(updatedMovies);
  }

  return (
    <>
    <div style={{width: '50%',display:'flex',justifyItems:'center',alignItems:'center', justifyContent:'center',alignContent:'center', marginLeft:'25%'}}>
    <form
        onSubmit={submitHandler}
        style={{ display: 'flex', flexDirection: 'column',width: '100%', justifyItems:'center',alignItems:'center',backgroundColor:'gray' }}
      >
        <label style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />

        <label
          style={{
            fontWeight: 'bold',
            marginTop: '1rem',
            marginBottom: '0.5rem',
          }}
        >
          Opening Text
        </label>
        <textarea
          rows="4"
          value={openingText}
          onChange={(e) => setOpeningText(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '1rem',
            resize: 'vertical',
          }}
        />

        <label
          style={{
            fontWeight: 'bold',
            marginTop: '1rem',
            marginBottom: '0.5rem',
          }}
        >
          Release Date
        </label>
        <input
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
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
            marginTop: '1.5rem',
            cursor: 'pointer',
          }}
        >
          Add Movie
        </button>
      </form>
      </div>
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
    </>
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
