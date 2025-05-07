import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Routes , Route} from 'react-router-dom'
import Login from './Pages/LoginPages/Login'
import SignUp from './Pages/LoginPages/SignUp'

const App=()=> {
  
  return (
    <>
     <Navbar/>
      <Routes>
        <Route path='/login' element= {<Login/>}/>
        <Route path='/signup' element= {<SignUp/>}/>
      </Routes>
   
    </>
   
  )
}

export default App
