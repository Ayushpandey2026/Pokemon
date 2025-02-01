import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./Movie.css";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

export const Movie = () => {
      const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
     const [movieType, setMovieType] = useState("movie");
      const [genre, setGenre] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    searchMovies("war", movieType, genre);
  }, [movieType, genre]);

    useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchMovies(debouncedSearchTerm, movieType, genre);
    } else {
      searchMovies("popular", movieType, genre);
    }
  }, [debouncedSearchTerm, movieType, genre]);

  const searchMovies = async (title, type, genre) => {
    const url = `${API_URL}&s=${title}&type=${type}${genre ? `&genre=${genre}` : ""}`;
    const response = await fetch(url);
    const data = await response.json();
    setMovies(data.Search || []);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const addToWatchlist = (movie) => {
    setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
  };

  const showMovieDetails = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    searchMovies(searchTerm, movieType, e.target.value);
  };

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <h1>The World of Cinema</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm, movieType, genre)}
        />
      </div>

      <div className="filter">
        <label htmlFor="movieType">Choose Movie Type: </label>
        <select
          id="movieType"
          value={movieType}
          onChange={(e) => setMovieType(e.target.value)}
        >
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
      </div>

      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <MovieCard movie={movie} />
              <button onClick={() => showMovieDetails(movie)}>View Details</button>
              <button onClick={() => addToWatchlist(movie)}>Add to Watchlist</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}

      {showModal && selectedMovie && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedMovie.Title}</h2>
            <p>{selectedMovie.Plot}</p>
            <p> Type: {selectedMovie.Type}</p>
            <p>Year: {selectedMovie.Year}</p>
            <button onClick={closeModal}>Close</button>
            <button onClick={() => window.open(`https://www.youtube.com/results?search_query=${selectedMovie.Title} trailer`)}>Watch Trailer</button>
          </div>
        </div>
      )}

      <div className="watchlist">
        <h2>Your Watchlist</h2>
        {watchlist.length > 0 ? (
          <ul>
        {watchlist.map((movie) => (
          <li key={movie.imdbID}>
                <MovieCard movie={movie} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No movies in your watchlist</p>
        )}
      </div>
    </div>
  );
};
