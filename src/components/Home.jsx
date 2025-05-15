import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../assets/reducers/productSlice'
import { useEffect } from 'react'
import { addItem } from '../assets/reducers/cartSlice'

function Home() {
  const dispatch = useDispatch()
  const productsState = useSelector((state) => state.products) || { products: [], isLoading: false, error: null }
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])


  const handleAddToCart = (product) => {
    dispatch(addItem(product))
    console.log('Product added:', product)
  }

  if (productsState.isLoading) {
    return (
      <div className="min-h-screen bg-zinc-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Loading...</h1>
          <div className="mt-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (productsState.error) {
    return (
      <div className="min-h-screen bg-zinc-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-red-600">Error: {productsState.error}</h1>
        </div>
      </div>
    )
  }

  if (!productsState.products || productsState.products.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">No products found</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-10 bg-zinc-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button className="bg-white text-indigo-600 border-2 border-indigo-600 px-6 py-2 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300 font-medium shadow-sm hover:shadow-md">
            Price &lt; $100
          </button>
          <button className="bg-white text-indigo-600 border-2 border-indigo-600 px-6 py-2 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300 font-medium shadow-sm hover:shadow-md">
            Men&apos;s Clothing
          </button>
          <button className="bg-white text-indigo-600 border-2 border-indigo-600 px-6 py-2 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300 font-medium shadow-sm hover:shadow-md">
            Women&apos;s Clothing
          </button>
          <button className="bg-white text-indigo-600 border-2 border-indigo-600 px-6 py-2 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300 font-medium shadow-sm hover:shadow-md">
            Jewelry
          </button>
          <button className="bg-white text-indigo-600 border-2 border-indigo-600 px-6 py-2 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300 font-medium shadow-sm hover:shadow-md">
            Electronics
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productsState.products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-64 object-contain p-4 hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.title}
                </h2>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-indigo-600">
                    ${product.price.toFixed(2)}
                  </p>
                  <button 
                    onClick={() => handleAddToCart(product)} 
                    className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
