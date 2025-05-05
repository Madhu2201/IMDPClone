import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Moviedetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [castDetails, setCastDetails] = useState({
    producer: null,
    actors: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(
          `https://backend-1h5d.onrender.com/api/getMovieById/${id}?populate=producer,actors`
        );
        const movieData = await response.json();
        setMovie(movieData);

        if (!movieData.producer?.name || !movieData.actors?.[0]?.name) {
          const producerPromise = fetch(
            `https://backend-1h5d.onrender.com/api/getProducerById/${movieData.producer}`
          ).then((res) => res.json());

          const actorsPromises = movieData.actors.map((actorId) =>
            fetch(
              `https://backend-1h5d.onrender.com/api/getActorById/${actorId}`
            ).then((res) => res.json())
          );

          const [producerData, ...actorsData] = await Promise.all([
            producerPromise,
            ...actorsPromises,
          ]);

          setCastDetails({
            producer: producerData,
            actors: actorsData,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieData();
  }, [id]);
  const handleUpdate = () => {
    navigate(`/update/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://backend-1h5d.onrender.com/api/delete/${id}`);
      alert("Movie deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  if (!movie) return <p className="error-message">Movie not found</p>;

  const getDisplayName = (entity, fallback) => {
    return entity?.name || fallback;
  };

  const producerName =
    movie.producer?.name || castDetails.producer?.name || "Unknown Producer";

  const actors = movie.actors?.[0]?.name
    ? movie.actors
    : castDetails.actors.length
    ? castDetails.actors
    : movie.actors;

  return (
    <div className="movie-details-container dark-theme">
      <div className="poster-container">
        <img src={movie.poster} alt={movie.name} className="poster-image" />
      </div>

      <div className="details-content">
        <h1 className="movie-title">{movie.name}</h1>

        <div className="movie-meta">
          <span className="release-date">
            {new Date(movie.releaseDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="genre-tag">{movie.genre?.join(", ")}</span>
        </div>

        <div className="rating-container">
          <span className="rating-value">{movie.rating}</span>
          <div className="stars">
            {"★".repeat(Math.round(movie.rating / 2))}
            {"☆".repeat(5 - Math.round(movie.rating / 2))}
          </div>
        </div>

        <div className="detail-section">
          <span className="detail-label">Producer</span>
          <p className="detail-text">{producerName}</p>
        </div>

        <div className="cast-grid">
          <div className="cast-member">
            <span className="detail-label">Actors</span>
            {actors?.map((actor, index) => (
              <p key={index} className="detail-text">
                {getDisplayName(actor, actor)}
              </p>
            ))}
          </div>

          {movie.coActor?.length > 0 && (
            <div className="cast-member">
              <span className="detail-label">Co-Actors</span>
              {movie.coActor.map((coActor, index) => (
                <p key={index} className="detail-text">
                  {coActor}
                </p>
              ))}
            </div>
          )}
        </div>

        {movie.about && (
          <div className="about-movie">
            <span className="detail-label">About</span>
            <p className="detail-text">{movie.about}</p>
          </div>
        )}
      </div>
      <div className="moviDetail-footer">
        <button className="update-btn" onClick={handleUpdate}>
          Update
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
