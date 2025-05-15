import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../assets/reducers/productSlice'
import { useEffect } from 'react'
import { addItem } from '../assets/reducers/cartSlice'
import { useNavigate } from 'react-router-dom'

function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productsState = useSelector((state) => state.products) || { products: [], isLoading: false, error: null }
  const cart = useSelector((state) => state.cart)
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleAddToCart = (product) => {
    dispatch(addItem(product))
  }

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
  }

  const filterProducts = (products) => {
    if (!products) return []
    
    switch (activeFilter) {
      case 'price':
        return products.filter(product => product.price < 100)
      case "men's clothing":
        return products.filter(product => product.category === "men's clothing")
      case "women's clothing":
        return products.filter(product => product.category === "women's clothing")
      case 'jewelery':
        return products.filter(product => product.category === 'jewelery')
      case 'electronics':
        return products.filter(product => product.category === 'electronics')
      default:
        return products
    }
  }

  const filteredProducts = filterProducts(productsState.products)

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

  if (!filteredProducts || filteredProducts.length === 0) {
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
          <button 
            onClick={() => setActiveFilter('price')}
            className={`border-2 px-6 py-2 rounded-full transition-all duration-300 font-medium shadow-sm hover:shadow-md ${
              activeFilter === 'price' 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white'
            }`}
          >
            Price &lt; $100
          </button>
          <button 
            onClick={() => setActiveFilter("men's clothing")}
            className={`border-2 px-6 py-2 rounded-full transition-all duration-300 font-medium shadow-sm hover:shadow-md ${
              activeFilter === "men's clothing" 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white'
            }`}
          >
            Men&apos;s Clothing
          </button>
          <button 
            onClick={() => setActiveFilter("women's clothing")}
            className={`border-2 px-6 py-2 rounded-full transition-all duration-300 font-medium shadow-sm hover:shadow-md ${
              activeFilter === "women's clothing" 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white'
            }`}
          >
            Women&apos;s Clothing
          </button>
          <button 
            onClick={() => setActiveFilter('jewelery')}
            className={`border-2 px-6 py-2 rounded-full transition-all duration-300 font-medium shadow-sm hover:shadow-md ${
              activeFilter === 'jewelery' 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white'
            }`}
          >
            Jewelry
          </button>
          <button 
            onClick={() => setActiveFilter('electronics')}
            className={`border-2 px-6 py-2 rounded-full transition-all duration-300 font-medium shadow-sm hover:shadow-md ${
              activeFilter === 'electronics' 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white'
            }`}
          >
            Electronics
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div 
                className="aspect-w-1 aspect-h-1 w-full overflow-hidden cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-64 object-contain p-4 hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h2 
                  className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 cursor-pointer hover:text-indigo-600"
                  onClick={() => handleProductClick(product.id)}
                >
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
