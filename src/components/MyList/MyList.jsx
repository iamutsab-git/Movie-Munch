import React from 'react'
import { useFavorites } from '../Context/FavoriteContext'

const MyList = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
  const FALLBACK_IMAGE = 
    "https://via.placeholder.com/500x750?text=Oops!+No+Image+Found+🥺";

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h2 className="text-3xl font-bold mb-8 text-center border-b-2 border-red-500 pb-4">
        Your Favorites
      </h2>
      {favorites.length === 0 ? (
        <p className="text-xl text-center mt-12">You don't have any favorites yet</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favorites.map(movie => (
            <li 
              key={movie.id}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-red-500/50 transition-shadow duration-300"
            >
              <div className="flex flex-col h-full">
                <img
                  className="w-full h-90 object-cover"
                  src={
                    movie.poster_path
                      ? `${BASE_IMAGE_URL}${movie.poster_path}`
                      : FALLBACK_IMAGE
                  }
                  alt={movie.title}
                  onError={(e) => {
                    e.target.src = FALLBACK_IMAGE;
                  }}
                />
                <div className="p-4 flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
                </div>
                <button 
                  onClick={() => removeFromFavorites(movie.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-b-lg transition-colors duration-200"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MyList