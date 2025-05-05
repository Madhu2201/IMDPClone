import PropTypes from "prop-types";
import "./MovieCard.css";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const handleOnclick = () => {
    navigate(`/movie/${movie._id}`);
  };
  return (
    <div className="card-wrapper" onClick={handleOnclick}>
      <div className="movie-card">
        <img src={movie.poster} alt={movie.name} className="movie-poster" />
        <div className="movie-content">
          <h3 className="movie-title">{movie.name}</h3>
          <p className="movie-plot">{movie.plot}</p>
          <a
            href={movie.trailerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="trailer-button"
          >
            ▶ Watch Trailer
          </a>
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    plot: PropTypes.string.isRequired,
    trailerUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
