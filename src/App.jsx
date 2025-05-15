import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Routes , Route} from 'react-router-dom'
import Login from './Pages/LoginPages/Login'
import SignUp from './Pages/LoginPages/SignUp'
import Home from './components/Home/Home'
import SinglePage from './components/SinglePage/SinglePage'
import { useFavorites } from './components/Context/FavoriteContext'
import MyList from './components/MyList/MyList'


const FavoritesList = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6">My Favorite Movies</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorite movies yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((movie) => (
            <div
              key={movie.id}
              className="border border-gray-300 p-4 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <button
                onClick={() => removeFromFavorites(movie.id)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};




const App=()=> {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  return (
    <>
     <Navbar/>
      <Routes>
        <Route path="/" element={<Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}/>
        <Route path='/login' element= {<Login/>}/>
        <Route path='/signup' element= {<SignUp/>}/>
        <Route path="/movie/:id" element={<SinglePage isDarkMode={isDarkMode} />}/>
        <Route path="/my-list" element={<MyList/>}/>
      </Routes>
      
    </>
   
  )
}

export default App
