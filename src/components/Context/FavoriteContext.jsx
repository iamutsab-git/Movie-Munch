
import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

 const addToFavorites = (movie) => {
    if (!movie || !movie.id) return; // Prevent adding invalid data
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => fav.id === movie.id)
        ? prevFavorites
        : [...prevFavorites, movie]
    );
  };

  const removeFromFavorites = (movieId) => {
    setFavorites(favorites.filter(movie => movie.id !== movieId));
  };

  


  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites}}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);