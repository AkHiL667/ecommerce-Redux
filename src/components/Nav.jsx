import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Nav() {
  const { totalQuantity } = useSelector((state) => state.cart) || { totalQuantity: 0 }

  return (
    <nav className='flex justify-between items-center p-4 fixed w-full bg-white z-10 shadow-md'>
      <div className='flex items-center'>
        <Link to="/" className='text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors duration-300'>
          ShopHub
        </Link>
      </div>
      <ul className='flex items-center gap-8'>
        <li>
          <Link 
            to="/" 
            className='text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-300 relative group'
          >
            Home
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300'></span>
          </Link>
        </li>
        <li>
          <Link 
            to="/cart" 
            className='flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-300 relative group'
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            <span>Cart</span>
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300'></span>
            <span className='absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
              {totalQuantity}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
