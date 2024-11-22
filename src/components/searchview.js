import React from 'react';
import { Link } from 'react-router-dom';
import Hero from './hero';
import './searchview.css';

const MovieCard = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const detailUrl = `/movies/${movie.id}`;

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
      <div className="card h-100 shadow-sm border-light">
        <img
          src={posterUrl}
          className="card-img-top"
          alt={movie.original_title}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{movie.original_title}</h5>
          <p className="card-text text-muted">Release Date: {movie.release_date}</p>
          <p className="card-text text-warning">Rating: {movie.vote_average}</p>
          <Link to={detailUrl} className="btn btn-primary mt-auto">
            Show Details
          </Link>
        </div>
      </div>
    </div>
  );
};

const SearchView = ({ keyword, searchResults }) => {
  const title = `You are searching for "${keyword}"`;

  return (
    <>
      <Hero text={title} />
      <div className="container mt-4">
        {searchResults.length > 0 ? (
          <div className="row">
            {searchResults.map((movie, index) => (
              <MovieCard movie={movie} key={index} />
            ))}
          </div>
        ) : (
          <div className="alert alert-warning text-center" role="alert">
            No results found for "{keyword}".
          </div>
        )}
      </div>
    </>
  );
};

export default SearchView;
