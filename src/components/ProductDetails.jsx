import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../assets/reducers/cartSlice'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productsState = useSelector((state) => state.products) || { products: [] }
  
  const product = productsState.products.find((p) => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Product not found</h1>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    dispatch(addItem(product))
  }

  return (
    <div className="min-h-screen pt-20 bg-zinc-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="mb-8 flex items-center text-indigo-600 hover:text-indigo-700 transition-colors duration-300"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" 
              clipRule="evenodd" 
            />
          </svg>
          Back to Products
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="flex items-center justify-center p-4">
              <img 
                src={product.image} 
                alt={product.title} 
                className="max-h-96 object-contain"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h1>
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold text-indigo-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">
                  {product.description}
                </p>
                <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`h-5 w-5 ${
                          index < Math.floor(product.rating?.rate || 0)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 15.585l-6.327 3.323 1.209-7.037L.172 7.323l7.036-1.023L10 0l2.792 6.3 7.036 1.023-4.71 4.548 1.209 7.037L10 15.585z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                    <span className="ml-2 text-gray-600">
                      ({product.rating?.count || 0} reviews)
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300 font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
