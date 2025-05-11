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
      </Routes>
    </>
   
  )
}

export default App
