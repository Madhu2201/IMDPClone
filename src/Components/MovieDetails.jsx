
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import './Moviedetails.css';

// const MovieDetails = () => {
//     const { id } = useParams();
//     const [movie, setMovie] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchMovieDetails = async () => {
//             try {
//                 const response = await fetch(`http://localhost:7000/api/getMovieById/${id}`);
//                 const data = await response.json();
//                 setMovie(data);
//             } catch (error) {
//                 console.error("Error fetching movie details:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchMovieDetails();
//     }, [id]);

//     if (loading) {
//         return (
//             <div className="loading-state">
//                 <div className="loading-dots">
//                     <span></span>
//                     <span></span>
//                     <span></span>
//                 </div>
//             </div>
//         );
//     }

//     if (!movie) return <p className="error-message">Movie not found</p>;

//     const actorsArray = Array.isArray(movie.actors) ? movie.actors : [movie.actors];
//     const coActorsArray = movie.coActor ? 
//         (Array.isArray(movie.coActor) ? movie.coActor : [movie.coActor]) : [];

//     return (
//         <div className="movie-details-container dark-theme">
//             <div className="poster-container">
//                 <img src={movie.poster} alt={movie.name} className="poster-image" />
//             </div>

//             <div className="details-content">
//                 <h1 className="movie-title">{movie.name}</h1>
                
//                 <div className="movie-meta">
//                     <span className="release-date">
//                         {new Date(movie.releaseDate).toLocaleDateString("en-US", {
//                             year: "numeric",
//                             month: "short",
//                             day: "numeric"
//                         })}
//                     </span>
//                     <span className="genre-tag">{movie.genre}</span>
//                 </div>

//                 <div className="rating-container">
//                     <span className="rating-value">{movie.rating}</span>
//                     <div className="stars">
//                         {'★'.repeat(Math.round(movie.rating / 2))}
//                         {'☆'.repeat(5 - Math.round(movie.rating / 2))}
//                     </div>
//                 </div>

//                 <div className="detail-section">
//                     <span className="detail-label">Producer</span>
//                     <p className="detail-text">{movie.producer}</p>
//                 </div>

//                 <div className="cast-grid">
//                     <div className="cast-member">
//                         <span className="detail-label">Actors</span>
//                         {actorsArray.map((actor, index) => (
//                             <p key={index} className="detail-text">{actor}</p>
//                         ))}
//                     </div>
                    
//                     {coActorsArray.length > 0 && (
//                         <div className="cast-member">
//                             <span className="detail-label">Co-Actors</span>
//                             {coActorsArray.map((coActor, index) => (
//                                 <p key={index} className="detail-text">{coActor}</p>
//                             ))}
//                         </div>
//                     )}
//                 </div>

//                 <div className="about-movie">
//                     <span className="detail-label">About</span>
//                     <p className="detail-text">{movie.about}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MovieDetails;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './Moviedetails.css';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [castDetails, setCastDetails] = useState({
        producer: null,
        actors: []
    });

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                // Fetch movie with populated data
                const response = await fetch(`http://localhost:7000/api/getMovieById/${id}?populate=producer,actors`);
                const movieData = await response.json();
                setMovie(movieData);

                // If population didn't work, fetch details separately
                if (!movieData.producer?.name || !movieData.actors?.[0]?.name) {
                    const producerPromise = fetch(`http://localhost:7000/api/getProducerById/${movieData.producer}`)
                        .then(res => res.json());
                    
                    const actorsPromises = movieData.actors.map(actorId => 
                        fetch(`http://localhost:7000/api/getActorById/${actorId}`)
                            .then(res => res.json())
                    );

                    const [producerData, ...actorsData] = await Promise.all([
                        producerPromise,
                        ...actorsPromises
                    ]);

                    setCastDetails({
                        producer: producerData,
                        actors: actorsData
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

    // Helper to get display name
    const getDisplayName = (entity, fallback) => {
        return entity?.name || fallback;
    };

    // Get producer name (from populated data or separate fetch)
    const producerName = movie.producer?.name || castDetails.producer?.name || "Unknown Producer";

    // Get actor names (from populated data or separate fetch)
    const actors = movie.actors?.[0]?.name 
        ? movie.actors 
        : castDetails.actors.length 
        ? castDetails.actors 
        : movie.actors; // fallback to IDs if no names available

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
                            day: "numeric"
                        })}
                    </span>
                    <span className="genre-tag">{movie.genre?.join(", ")}</span>
                </div>

                <div className="rating-container">
                    <span className="rating-value">{movie.rating}</span>
                    <div className="stars">
                        {'★'.repeat(Math.round(movie.rating / 2))}
                        {'☆'.repeat(5 - Math.round(movie.rating / 2))}
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
                                <p key={index} className="detail-text">{coActor}</p>
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
        </div>
    );
};

export default MovieDetails;