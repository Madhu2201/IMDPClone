import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/movieSlice";
import FeaturedToday from "../Components/FeaturedToday";

const Home = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) return <p>Loading movies...</p>;

  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  if (data.length === 0) return <p>No movies found.</p>;

  const featuredMovies = data;

  return (
    <div className="bg-black min-h-screen text-white px-4 md:px-12 py-6">
      <FeaturedToday movies={featuredMovies} />
    </div>
  );
};

export default Home;
