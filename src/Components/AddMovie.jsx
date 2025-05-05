import axios from "axios";
import { useState } from "react";
import "./AddMovie.css";
const AddMovie = () => {
  const [movie, setMovie] = useState({
    name: "",
    plot: "",
    poster: "",
    trailerUrl: "",
    releaseDate: "",
    genre: "",
    producerName: "",
    actorNames: [],
    coActor: "",
    about: "",
    rating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://backend-1h5d.onrender.com/api/create",
        movie
      );

      console.log("Movie added successfully:", response.data);

      setMovie({
        name: "",
        plot: "",
        poster: "",
        trailerUrl: "",
        releaseDate: "",
        genre: "",
        producerName: "",
        actorNames: [],
        coActor: "",
        about: "",
        rating: 0,
      });
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <div className="addMovie-container">
      <h1>Add Movie</h1>
      <div className="addMovie-border">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="addMovie-text"
            value={movie.name}
            onChange={handleChange}
            placeholder="Movie Name"
          />
          <textarea
            name="plot"
            className="addMovie-text"
            value={movie.plot}
            onChange={handleChange}
            placeholder="Plot"
          />
          <input
            type="text"
            name="poster"
            className="addMovie-text"
            value={movie.poster}
            onChange={handleChange}
            placeholder="Poster URL"
          />
          <input
            type="text"
            name="trailerUrl"
            className="addMovie-text"
            value={movie.trailerUrl}
            onChange={handleChange}
            placeholder="Trailer URL"
          />
          <input
            type="date"
            name="releaseDate"
            className="addMovie-text"
            value={new Date(movie.releaseDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
            onChange={handleChange}
          />

          <input
            type="text"
            name="genre"
            className="addMovie-text"
            value={movie.genre}
            onChange={handleChange}
            placeholder="Genre (comma separated)"
          />
          <input
            type="text"
            name="producerName"
            className="addMovie-text"
            value={movie.producerName}
            onChange={handleChange}
            placeholder="Producer Name"
          />

          <input
            type="text"
            name="actorNames"
            className="addMovie-text"
            value={movie.actorNames.join(", ")}
            onChange={(e) =>
              setMovie((prev) => ({
                ...prev,
                actorNames: e.target.value
                  .split(",")
                  .map((name) => name.trim()),
              }))
            }
            placeholder="Actors (comma separated)"
          />

          <input
            type="text"
            name="coActor"
            className="addMovie-text"
            value={movie.coActor}
            onChange={handleChange}
            placeholder="Co-Actor"
          />
          <textarea
            name="about"
            className="addMovie-text"
            value={movie.about}
            onChange={handleChange}
            placeholder="About"
          />
          <input
            type="number"
            name="rating"
            className="addMovie-text"
            value={movie.rating}
            onChange={handleChange}
            placeholder="Rating"
          />

          <button type="submit">Add Movie</button>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
