import React, { useEffect, useState } from "react";
import "./toprated.css"; // Ensure this CSS file is created for styling

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2M1YmI0YTY1OTg1MmI5YmEzNzYxMDk3NDk3MzQyZSIsIm5iZiI6MTcyMTQ4NDY2My41NjcwNzYsInN1YiI6IjY2OWExMDk5ZDQxZDkwM2FlZjEzYTNjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.unfb_nAZqnJNkkYkviSoZTUecq5gsgN9HijDdij8fnk'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMovies(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedMovies();
  }, []);

  if (loading) {
    return <div className="container mt-4"><div className="alert alert-info">Loading top-rated movies...</div></div>;
  }

  if (error) {
    return <div className="container mt-4"><div className="alert alert-danger">Error: {error}</div></div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Top Rated Movies</h2>
      <div className="row">
        {movies.map((movie) => (
          <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4" key={movie.id}>
            <div className="card h-100">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="card-img-top"
                alt={movie.title}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text text-muted">Rating: {movie.vote_average}</p>
                {/* Removed the "View Details" button */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedMovies;
