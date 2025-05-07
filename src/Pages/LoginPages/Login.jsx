import React from 'react'
import {Link} from 'react-router-dom'

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black/80 to-gray-900 flex items-center justify-center">
      <div className="bg-black/70 p-8 rounded-lg max-w-md w-full">
        <h2 className="text-red-600 text-3xl font-bold mb-6">Sign In to Movie Munch</h2>
        <form className="space-y-4">
          <div>
            <label className="text-white text-sm">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-600"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="text-white text-sm">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-600"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
          >
            Sign In
          </button>
        </form>
        <p className="text-gray-400 text-sm mt-4">
          New to Movie Munch?{' '}
          <Link to ='/signup' className="text-red-600 hover:text-red-400">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login