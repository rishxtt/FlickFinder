// Genres.js
import React, { useEffect, useState } from "react";
import "./genre.css"; // Ensure this CSS file is created for styling

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', {
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
        setGenres(data.genres);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) {
    return <div className="container mt-4"><div className="alert alert-info">Loading genres...</div></div>;
  }

  if (error) {
    return <div className="container mt-4"><div className="alert alert-danger">Error: {error}</div></div>;
  }

  const filteredGenres = genres.filter(genre => 
    genre.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Movie Genres</h2>
      <div className="text-center mb-4">
        <input 
          type="text" 
          className="form-control search-input"
          placeholder="Search genres..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="row">
        {filteredGenres.map((genre) => (
          <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4" key={genre.id}>
            <div className="card h-100 genre-card">
              <div className="card-body d-flex justify-content-center align-items-center">
                <h5 className="card-title">{genre.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genres;
