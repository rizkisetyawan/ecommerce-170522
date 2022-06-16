/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { Zoom } from '@mui/material';
import store from './redux/store';
import {
  Home,
  Login,
  Register,
  Product,
  Cart,
  Payment,
  Wishlist,
  Category,
  Order,
  Settings,
  Reviews,
  Products,
  Statistics,
} from './pages';
import { Topbar } from './components';

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        TransitionComponent={Zoom}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Topbar />}>
              <Route index element={<Home />} />
              <Route path="product/:id" element={<Product />} />
              <Route path="products" element={<Products />} />
              <Route path="cart" element={<Cart />} />
              <Route path="payment" element={<Payment />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="order" element={<Order />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="settings" element={<Settings />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="category/:title" element={<Category />} />
            </Route>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
