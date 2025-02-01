import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <p>{movie.Type}</p>
      <p>{movie.rating}</p>
    </div>
  );
};

export default MovieCard;
