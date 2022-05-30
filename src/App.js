/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Login, Register, Product } from './pages';
import { Topbar } from './components';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Topbar />}>
          <Route index element={<Home />} />
          <Route path="/product" element={<Product />} />
        </Route>
        <Route>
          <Route path="/dashboard" element={<Product />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
