
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateAndDelete.css";

const UpdateAndDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`https://backend-1h5d.onrender.com/api/getMovieById/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error("Failed to fetch movie:", err);
      }
    };
    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle arrays
    if (["actorNames", "genre", "coActor"].includes(name)) {
      const arrayValue = value.split(",").map((item) => item.trim());
      setMovie((prev) => ({ ...prev, [name]: arrayValue }));
    }

    // Handle producer name (inside object)
    else if (name === "producerName") {
      setMovie((prev) => ({
        ...prev,
        producer: { ...prev.producer, name: value },
      }));
    }

    // Handle all other fields
    else {
      setMovie((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault(); // prevent form from reloading

    try {
      const token = localStorage.getItem("token");

      const updatedMovie = {
        ...movie,
        producerName: movie.producer?.name,
        actorNames: Array.isArray(movie.actorNames)
          ? movie.actorNames
          : movie.actors?.map((actor) => actor.name) || [],
      };

      await axios.put(`https://backend-1h5d.onrender.com/api/updated/${id}`, updatedMovie, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Movie updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error updating movie:", err);
      alert("Failed to update movie");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault(); // prevent form from reloading
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://backend-1h5d.onrender.com/api/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Movie deleted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error deleting movie:", err);
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="update-delete-container">
      <h1>Update or Delete Movie</h1>
      <div className="update-delete-border">
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" name="name" className="update-delete-text" value={movie.name} onChange={handleChange} placeholder="Name" />

          <textarea name="plot" className="update-delete-text" value={movie.plot || ""} onChange={handleChange} placeholder="Plot" />

          <input type="text" name="poster" className="update-delete-text" value={movie.poster} onChange={handleChange} placeholder="Poster URL" />

          <input type="text" name="trailerUrl" className="update-delete-text" value={movie.trailerUrl} onChange={handleChange} placeholder="Trailer URL" />

          <input type="date" name="releaseDate" className="update-delete-text" value={movie.releaseDate?.substring(0, 10)} onChange={handleChange} />

          <input type="text" name="genre" className="update-delete-text" value={movie.genre?.join(", ") || ""} onChange={handleChange} placeholder="Genres (comma-separated)" />

          <input type="text" name="producerName" className="update-delete-text" value={movie.producer?.name || ""} onChange={handleChange} placeholder="Producer Name" />

          <input type="text" name="actorNames" className="update-delete-text" value={movie.actors?.map(actor => actor.name).join(", ") || ""} onChange={handleChange} placeholder="Actor Names (comma-separated)" />

          <input type="text" name="coActor" className="update-delete-text" value={movie.coActor?.join(", ") || ""} onChange={handleChange} placeholder="Co-Actors (comma-separated)" />

          <textarea name="about" className="update-delete-text" value={movie.about || ""} onChange={handleChange} placeholder="About"></textarea>

          <input type="number" className="update-delete-text" name="rating" value={movie.rating} onChange={handleChange} placeholder="Rating" min="0" max="10" step="0.1" />

          <button className="update-btn" onClick={handleUpdate}>Update</button>
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAndDelete;
