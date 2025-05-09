import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, movies, title }) => {
  const navigate = useNavigate();
  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
  const BASE_BACKDROP_URL = "https://image.tmdb.org/t/p/w780";
  const FALLBACK_IMAGE =
    "https://via.placeholder.com/500x750?text=Oops!+No+Image+Found+🥺";

  const cardVariants = {
    hover: {
      scale: 1.15,
      zIndex: 10,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    initial: { scale: 1 },
  };

  const handleSinglePage = (movieId) => {
    navigate(`/singlePage/${movieId}`);
    console.log("Clicked movie ID:", movieId);
  };

  // If movies and title are provided, render a section
  if (movies && title) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-10"
      >
        <h2 className="text-3xl font-bold text-white mb-4 pl-4">{title}</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4 px-4 scrollbar-hide">
          {movies.map((movieItem) => (
            <motion.div
              key={movieItem.id}
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              className="flex-none w-52 movie-card relative h-64 rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={() => handleSinglePage(movieItem.id)} // Pass movie ID on click
            >
              <img
                src={
                  movieItem.poster_path
                    ? `${BASE_IMAGE_URL}${movieItem.poster_path}`
                    : FALLBACK_IMAGE
                }
                alt={movieItem.title || "Movie poster"}
                className="w-full h-full object-cover"
                onError={(e) => (e.target.src = FALLBACK_IMAGE)}
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-4"
                style={{
                  backgroundImage: movieItem.backdrop_path
                    ? `url(${BASE_BACKDROP_URL}${movieItem.backdrop_path})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <h3 className="text-white text-lg font-bold truncate">
                  {movieItem.title || "Untitled Movie"}
                </h3>
                <p className="text-gray-300 text-sm line-clamp-2">
                  {movieItem.overview?.slice(0, 80) || "No description available"}...
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // If only a single movie is provided, render the individual card
  return (
    <div className="movie-card border border-gray-300 p-4 m-4 max-w-xs rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="movie-poster overflow-hidden rounded-md">
        <img
          src={movie.poster_path ? `${BASE_IMAGE_URL}${movie.poster_path}` : FALLBACK_IMAGE}
          alt={movie.title || "Movie poster"}
          className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
          onError={(e) => (e.target.src = FALLBACK_IMAGE)}
        />
      </div>
      <div className="movie-info text-center mt-4">
        <h3 className="text-lg font-bold truncate">{movie.title || "Untitled Movie"}</h3>
        <p className="text-gray-600">{movie.release_date || "Unknown release date"}</p>
      </div>
    </div>
  );
};

export default MovieCard;