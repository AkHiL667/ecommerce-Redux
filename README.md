# ShopHub - E-commerce Platform

ShopHub is a modern e-commerce platform built with React and Redux, featuring a clean UI and robust functionality. The project demonstrates the implementation of state management, data persistence, and API integration in a React application.

## 🚀 Features

### Product Management
- Browse products from Fake Store API
- Detailed product view with images, descriptions, and ratings
- Product filtering by categories and price
- Responsive grid layout for product display

### Shopping Cart
- Add/remove items from cart
- Persistent cart data using Redux Persist
- Real-time cart total and quantity updates
- Cart items management (quantity adjustment, removal)

### State Management
- Redux Toolkit for efficient state management
- Redux Persist for maintaining cart data across sessions
- Async data fetching using createAsyncThunk
- Optimized state updates and calculations

### User Interface
- Modern and responsive design using Tailwind CSS
- Interactive product cards with hover effects
- Category filters with active state indicators
- Loading states and error handling
- Smooth transitions and animations

## 🛠️ Technologies Used

- **React** - Frontend library
- **Redux Toolkit** - State management
- **Redux Persist** - State persistence
- **React Router** - Navigation and routing
- **Tailwind CSS** - Styling and responsive design
- **Fake Store API** - Product data
- **Axios** - API requests

## 📦 Project Structure

```
src/
├── assets/
│   ├── reducers/
│   │   ├── cartSlice.js
│   │   └── productSlice.js
│   └── store.js
├── components/
│   ├── Cart.jsx
│   ├── Home.jsx
│   ├── Nav.jsx
│   └── ProductDetails.jsx
├── App.jsx
└── main.jsx
```

## 🔧 Key Implementations

### Redux Store Setup
```javascript
// Store configuration with persistence
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};
```

### Async Data Fetching
```javascript
// Product fetching using createAsyncThunk
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  }
);
```

### Cart Functionality
- Add to cart
- Remove from cart
- Update quantities
- Calculate totals
- Persistent storage

### Product Filtering
- Category-based filtering
- Price-based filtering
- Dynamic filter updates
- Active filter indicators

