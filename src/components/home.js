import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const HomePage = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2M1YmI0YTY1OTg1MmI5YmEzNzYxMDk3NDk3MzQyZSIsIm5iZiI6MTcyMTQ4NDY2My41NjcwNzYsInN1YiI6IjY2OWExMDk5ZDQxZDkwM2FlZjEzYTNjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.unfb_nAZqnJNkkYkviSoZTUecq5gsgN9HijDdij8fnk'
      }
    };

    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
      .then(response => response.json())
      .then(response => setNowPlayingMovies(response.results))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container my-4">
      <div className="jumbotron">
        <h1 className="display-4">Welcome to FlickFinder</h1>
        <p className="lead">Discover the latest movies now playing in theaters.</p>
        <br></br>
        <Link className="btn btn-primary btn-lg" to="/movies" role="button">Browse Movies</Link>
      </div>
      <div className="row">
        {nowPlayingMovies.map((movie) => (
          <div key={movie.id} className="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch">
            <div className="card h-100">
              <img
                className="card-img-top"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">{movie.title}</h4>
                <p className="card-text flex-grow-1">{movie.overview}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
