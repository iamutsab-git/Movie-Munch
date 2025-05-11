import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MovieCard from '../../components/Card/MovieCard'
import Navbar from "../../components/Navbar/Navbar";
import {
  getPopularMovies,
  getSearchMovies,
  getTopRatedMovies,
  getHorrorMovies,
  getSciFiMovies,
  getComedyMovies,
  getActionMovies,
} from "../../Services/api";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [sciFiMovies, setSciFiMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [popular, topRated, horror, sciFi, comedy, action] = await Promise.all([
          getPopularMovies(),
          getTopRatedMovies(),
          getHorrorMovies(),
          getSciFiMovies(),
          getComedyMovies(),
          getActionMovies(),
        ]);

        setPopularMovies(popular);
        setTopRatedMovies(topRated);
        setHorrorMovies(horror);
        setSciFiMovies(sciFi);
        setComedyMovies(comedy);
        setActionMovies(action);
      } catch (error) {
        setError("Failed to load movies..");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    try {
      const searchedMovies = await getSearchMovies(searchQuery);
      if (Array.isArray(searchedMovies)) {
        setPopularMovies(searchedMovies);
      } else {
        setError("No movies found or invalid data format");
      }
    } catch (error) {
      setError("Failed to search movies..");
      console.log(error);
    }
    setSearchQuery("");
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} overflow-y-auto`} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <style>
        {`
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center h-screen"
        >
          <div className={`animate-spin rounded-full h-20 w-20 border-t-4 ${isDarkMode ? 'border-red-500' : 'border-blue-500'}`}></div>
        </motion.div>
      ) : (
        <>
          {/* Hero Section */}
          <div
            className="relative h-[70vh] bg-cover bg-center"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${popularMovies[0]?.backdrop_path})`,
            }}
          >
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-t from-gray-900 to-transparent' : 'bg-gradient-to-t from-gray-100 to-transparent'}`}>
            
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="container mx-auto px-6 pt-32 pb-12 flex flex-col justify-end h-full"
              >
                <h1 className={`text-5xl md:text-6xl font-extrabold drop-shadow-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {popularMovies[0]?.title}
                </h1>
                <p className={`mt-4 text-lg max-w-2xl drop-shadow-md ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  {popularMovies[0]?.overview?.slice(0, 200)}...
                </p>
                <motion.form
                  onSubmit={handleSearch}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="mt-6 flex gap-4 max-w-md items-center"
                >
                  <input
                    type="text"
                    placeholder="Search for a movie..."
                    className={`w-full px-4 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 ${isDarkMode ? 'bg-red-500' : 'bg-blue-500'} text-white rounded-full font-semibold`}
                  >
                    Search
                  </motion.button>
                  {/* Theme Toggle Button */}
                  <motion.button
                    onClick={toggleTheme}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-3 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-full font-semibold`}
                  >
                    {isDarkMode ? '☀️' : '🌙'}
                  </motion.button>
                </motion.form>
              </motion.div>
            </div>
          </div>

          {/* Movie Sections Rendered via MovieCard */}
          <div className="container mx-auto px-6 py-12">
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-center p-4 rounded-lg mb-8 ${
                  isDarkMode ? 'text-red-400 bg-red-900/20' : 'text-red-600 bg-red-100'
                }`}
              >
                {error}
              </motion.div>
            )}
            <MovieCard title="Popular on Movie Munch" movies={popularMovies} />
            <MovieCard title="Top Rated Gems" movies={topRatedMovies} />
            <MovieCard title="Horror Nights" movies={horrorMovies} />
            <MovieCard title="Sci-Fi Journeys" movies={sciFiMovies} />
            <MovieCard title="Laugh Out Loud" movies={comedyMovies} />
            <MovieCard title="Action Unleashed" movies={actionMovies} />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;