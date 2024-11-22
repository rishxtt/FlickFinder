import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './tvshows.css';

const TVShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', {
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
        setTvShows(data.results); // Adjust according to your API response structure
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTvShows();
  }, []);

  if (loading) {
    return <div className="container mt-4"><div className="alert alert-info">Loading TV shows...</div></div>;
  }

  if (error) {
    return <div className="container mt-4"><div className="alert alert-danger">Error: {error}</div></div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Trending TV Shows</h1>
      <div className="row">
        {tvShows.map((show) => (
          <div className="col-lg-4 col-md-6 mb-4" key={show.id}>
            <div className="card h-100">
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                className="card-img-top"
                alt={show.name}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{show.name}</h5>
                <p className="card-text">Rating: {show.vote_average}</p>
                <Link to={`/tv-shows/${show.id}`} className="btn btn-primary mt-auto">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TVShows;
