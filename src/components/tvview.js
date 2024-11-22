import { useEffect, useState } from "react";
import Hero from "./hero";
import { useParams } from "react-router-dom";

const TVShowDetail = () => {
  const { id } = useParams();
  const [tvShowDetails, setTvShowDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=01957ee3309bafdb81238954f4159e50&language=en-US`)
      .then(response => response.json())
      .then(data => {
        setTvShowDetails(data);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <Hero text="Loading..." />;
  }

  if (!tvShowDetails) {
    return <Hero text="TV Show not found" />;
  }

  const posterPath = `https://image.tmdb.org/t/p/w500${tvShowDetails.poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/original${tvShowDetails.backdrop_path}`;

  return (
    <>
      <Hero text={tvShowDetails.name} backdrop={backdropUrl} />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-3">
            <img src={posterPath} alt={tvShowDetails.name} className="img-fluid shadow rounded" />
          </div>
          <div className="col-md-9">
            <h2>{tvShowDetails.name}</h2>
            <p className="lead">{tvShowDetails.overview}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TVShowDetail;
