import './App.css';
import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Home from './components/home';
import { Routes, Route } from 'react-router-dom';
import SearchView from './components/searchview';
import MovieView from './components/movieview';
import TVShows from './components/tvshows';
import Movies from './components/movies';
import TVShowDetail from './components/tvview';
import TopRatedMovies from './components/toprated';
import Genres from './components/genre';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2M1YmI0YTY1OTg1MmI5YmEzNzYxMDk3NDk3MzQyZSIsIm5iZiI6MTcyMTY2MDM2NC41ODUyLCJzdWIiOiI2NjlhMTA5OWQ0MWQ5MDNhZWYxM2EzY2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.lWrIcEp-oZdWBpM3igKJIr96O1TEoAuQLx90JtyjjiY'
  }
};

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (searchText) {
      fetch(`https://api.themoviedb.org/3/search/multi?query=${searchText}&page=1&include_adult=false`, options)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setSearchResults(data.results);
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        });
    }
  }, [searchText]);

  return (
    <div>
      <Navbar searchText={searchText} setSearchText={setSearchText} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/shows" element={<TVShows />} />
        <Route path="/top-rated" element={<TopRatedMovies />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/search" element={<SearchView keyword={searchText} searchResults={searchResults} />} />
        <Route path="/tv-shows/:id" element={<TVShowDetail />} />
        <Route path="/movies/:id" element={<MovieView />} />
      </Routes>
    </div>
  );
}

export default App;
