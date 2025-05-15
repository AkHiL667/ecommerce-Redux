import Home from './components/Home'  
import Nav from './components/Nav'
import Cart from './components/Cart'
import { Routes, Route } from 'react-router-dom'

function App() { 
  return(
    <div>
      <Nav />
      <div className="pt-16"> {/* Add padding-top to account for fixed navbar */}
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
