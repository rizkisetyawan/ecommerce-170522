/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Home, Login, Register, Product, Cart,
} from './pages';
import { Topbar } from './components';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Topbar />}>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route>
          <Route path="/dashboard" element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
