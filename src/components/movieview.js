import { useEffect, useState } from "react";
import Hero from "./hero";
import { useParams } from "react-router-dom";

const MovieView = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=01957ee3309bafdb81238954f4159e50&language=en-US`)
      .then(response => response.json())
      .then(data => {
        setMovieDetails(data);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <Hero text="Loading..." />;
  }

  if (!movieDetails) {
    return <Hero text="Movie not found" />;
  }

  const posterPath = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`

  return (
    <>
      <Hero text={movieDetails.original_title} backdrop={backdropUrl} />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-3">
            <img src={posterPath} alt={movieDetails.original_title} className="img-fluid shadow rounded" />
          </div>
          <div className="col-md-9">
            <h2>{movieDetails.original_title}</h2>
            <p className="lead">{movieDetails.overview}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieView;
