import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2M1YmI0YTY1OTg1MmI5YmEzNzYxMDk3NDk3MzQyZSIsIm5iZiI6MTcyMTQ4NDY2My41NjcwNzYsInN1YiI6IjY2OWExMDk5ZDQxZDkwM2FlZjEzYTNjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.unfb_nAZqnJNkkYkviSoZTUecq5gsgN9HijDdij8fnk'
        }
      };

      try {
        const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div className="container mt-4"><div className="alert alert-info">Loading movies...</div></div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Trending Movies</h2>
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
                <p className="card-text text-muted">Release Date: {movie.release_date}</p>
                <p className="card-text text-warning">Rating: {movie.vote_average}</p>
                <Link to={`/movies/${movie.id}`} className="btn btn-primary mt-auto">
                  Show Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
