import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, removeItem, clearCart, deleteItem } from '../assets/reducers/cartSlice'

function Cart() {
  const { cart, totalQuantity, totalAmount } = useSelector((state) => state.cart) || { cart: [], totalQuantity: 0, totalAmount: 0 }
  const dispatch = useDispatch()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      
      {!cart || cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border p-4 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600">${item.price}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => dispatch(removeItem(item))}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <button
                    onClick={() => dispatch(addItem(item))}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(deleteItem(item))}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-between mb-2">
              <span>Total Items:</span>
              <span>{totalQuantity}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Total Amount:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
