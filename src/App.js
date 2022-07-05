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
  Purchase,
  Settings,
  Reviews,
  Products,
  Statistics,
  Search,
  Order,
  AdminUser,
  AdminDashboard,
  AdminProduct,
  AdminTransaction,
  Toko,
} from './pages';
import { Topbar, Drawer, Auth } from './components';

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
              <Route path="payment/:noInvoice" element={<Payment />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="purchase" element={<Purchase />} />
              <Route path="order" element={<Order />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="settings" element={<Settings />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="category/:title" element={<Category />} />
              <Route path="toko/:idToko" element={<Toko />} />
              <Route path="search/:title" element={<Search />} />
            </Route>
            <Route path="/admin" element={<Drawer />}>
              <Route index element={<Auth><AdminDashboard /></Auth>} />
              <Route path="users" element={<Auth><AdminUser /></Auth>} />
              <Route path="products" element={<Auth><AdminProduct /></Auth>} />
              <Route path="transactions" element={<Auth><AdminTransaction /></Auth>} />
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
