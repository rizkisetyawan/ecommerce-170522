/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Login, Register } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
