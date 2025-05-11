import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getMovieDetails } from '../../Services/api';

const SinglePage = ({ isDarkMode }) => {
  const { id } = useParams(); // Get movie ID from URL
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
  const BASE_BACKDROP_URL = "https://image.tmdb.org/t/p/w780";
  const FALLBACK_IMAGE =
    "https://via.placeholder.com/500x750?text=Oops!+No+Image+Found+🥺";

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load movie details');
        setLoading(false);
      }
    };
    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`flex justify-center items-center h-screen ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
        }`}
      >
        <div
          className={`animate-spin rounded-full h-20 w-20 border-t-4 ${
            isDarkMode ? 'border-red-500' : 'border-blue-500'
          }`}
        ></div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`flex justify-center items-center h-screen ${
          isDarkMode ? 'text-red-400 bg-gray-900' : 'text-red-600 bg-gray-100'
        }`}
      >
        {error}
      </motion.div>
    );
  }

  if (!movie) return null;

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      {/* Backdrop Section */}
      <div
        className="relative h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage: movie.backdrop_path
            ? `url(${BASE_BACKDROP_URL}${movie.backdrop_path})`
            : `url(${FALLBACK_IMAGE})`,
        }}
      >
        <div
          className={`absolute inset-0 ${
            isDarkMode
              ? 'bg-gradient-to-t from-gray-900 to-transparent'
              : 'bg-gradient-to-t from-gray-100 to-transparent'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="container mx-auto px-6 pt-20 flex items-end h-full"
          >
            <h1
              className={`text-4xl md:text-5xl font-extrabold drop-shadow-lg ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {movie.title || 'Untitled Movie'}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Movie Details Section */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="md:flex gap-8"
        >
          {/* Poster */}
          <div className="md:w-1/3">
            <img
              src={
                movie.poster_path
                  ? `${BASE_IMAGE_URL}${movie.poster_path}`
                  : FALLBACK_IMAGE
              }
              alt={movie.title || 'Movie poster'}
              className="w-full rounded-lg shadow-lg"
              onError={(e) => (e.target.src = FALLBACK_IMAGE)}
            />
          </div>
          {/* Details */}
          <div className="md:w-2/3 mt-6 md:mt-0">
            <p
              className={`text-lg mb-4 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              {movie.overview || 'No description available'}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold">Release Date:</span>{' '}
                {movie.release_date || 'Unknown'}
              </div>
              <div>
                <span className="font-semibold">Rating:</span>{' '}
                {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}/10
              </div>
              <div>
                <span className="font-semibold">Genres:</span>{' '}
                {movie.genres?.map((g) => g.name).join(', ') || 'Unknown'}
              </div>
              <div>
                <span className="font-semibold">Runtime:</span>{' '}
                {movie.runtime ? `${movie.runtime} minutes` : 'Unknown'}
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 ${
                  isDarkMode ? 'bg-red-500' : 'bg-blue-500'
                } text-white rounded-full font-semibold`}
                onClick={() => alert('Watch Now clicked!')}
              >
                Watch Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                } text-${isDarkMode ? 'white' : 'gray-900'} rounded-full font-semibold`}
                onClick={() => navigate('/')}
              >
                Back to Home
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SinglePage;