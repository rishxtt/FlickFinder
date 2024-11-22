import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = ({ searchText, setSearchText }) => {
  const navigate = useNavigate();

  const updateSearchText = (e) => {
    setSearchText(e.target.value);
    if (e.target.value) {
      navigate('/search');
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            FlickFinder
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/movies"
                >
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shows">
                  TV Shows
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/top-rated">
                  Top Rated
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/genres">
                  Genres
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder=""
                aria-label="Search"
                value={searchText}
                onChange={updateSearchText}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
