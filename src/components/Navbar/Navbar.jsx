import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-b from-black/40 to-transparent fixed w-full z-10">
      <ul className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <li>
          <Link 
            to="/" 
            className="font-serif text-red-600 text-2xl font-bold hover:text-red-400 transition-colors duration-300"
          >
            Movie Munch🍿
          </Link>
        </li>
        <div className="flex items-center space-x-4">
          <Link to="/my-list" 
            className="bg-grey- text-red-600 border rounded-md px-4 py-2 hover:text-red-400 transition-colors duration-300"
          >
            My List
          </Link>
          <Link 
            to="/signup"
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
          >
            Sign Up
          </Link>
          <Link 
            to="/login"
            className="bg-transparent border border-red-600 text-red-600 px-4 py-2 rounded-md hover:bg-red-600 hover:text-white transition-colors duration-300"
          >
            Sign In
          </Link>
        </div>
      </ul>
    </nav>
  )
}

export default Navbar