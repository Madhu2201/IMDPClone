


import PropTypes from "prop-types";
import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedToday.css";

const FeaturedToday = ({ movies }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);

  // Take the last 5 movies for the featured scroll (excluding top one)
  const featuredMovies = [...movies].slice(-6, -1).reverse();
  const filteredMovies = movies.filter((movie) => {
    const term = searchTerm.toLowerCase();
    const matchName = movie.name.toLowerCase().includes(term);
    const matchProducer = movie.producer?.name?.toLowerCase().includes(term);
    const matchActor = movie.actors?.some(actor => actor.name.toLowerCase().includes(term));
    return matchName || matchProducer || matchActor;
  });
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
  };
  

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? featuredMovies.length - 1 : prev - 1
    );
  };
  

  const handleClick = () => {
    navigate("/addmovie");
  };

  return (
    <div className="featured-container">
      <div className="featured-header">
        <h2>Featured Latest</h2>
        <input
  placeholder="Search by movie, producer or actor"
  value={searchTerm} className="searchBox"
  onChange={(e) => setSearchTerm(e.target.value)}
/>

        <button className="AddMovie-btn" onClick={handleClick}>Add Movies</button>
      </div>

      {/* Featured Carousel */}
      <div className="featured-movie-scroll">
        <button className="arrow-btn left" onClick={handlePrev}>
          &#10094;
        </button>

        <div className="featured-slide">
          {featuredMovies.map((movie, index) => (
            <div
              key={movie.id}
              className={`featured-movie ${
                index === currentIndex ? "active" : "inactive"
              }`}
            >
              <div className="featured-movie-content">
 <div className="onclick-movie" onClick={() => navigate(`/movie/${movie._id}`)}>   

                        <img src={movie.poster} alt={movie.name} />

                </div>
                <div className="movie-details">
                <h3>{movie.name}</h3>
                <p>{movie.plot}</p>
                <h5>{new Date(movie.releaseDate).toLocaleDateString("en-US",{
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}</h5>
                <h6>Rating: {movie.rating}</h6>
                </div>
            
            </div>

              </div>
             
          ))}
        </div>

        <button className="arrow-btn right" onClick={handleNext}>
          &#10095;
        </button>
      </div>

      {/* Full Movie List */}
      <div className="card-wrapper">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="featured-footer">
        <div>
          <ul>
        <h2>Featured Movies</h2>
        <li>Discover the latest and greatest in cinema.</li>
        <li>Explore our curated selection of films that are making waves.</li>
        <li>From blockbusters to indie gems, find your next favorite movie.</li>
        <li>Join the conversation and share your thoughts on these films.</li>
        <li>Stay tuned for more updates and recommendations!</li>
        </ul>
        </div>
        <div>
        <p>Happy watching!</p>
        <p>IMDP Clone Team</p>
        <p>2023</p>
        <p>All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

FeaturedToday.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
      plot: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default FeaturedToday;
