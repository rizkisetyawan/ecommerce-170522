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
              <Route path="product" element={<Product />} />
              <Route path="cart" element={<Cart />} />
              <Route path="payment" element={<Payment />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="order" element={<Order />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="settings" element={<Settings />} />
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

// import { IKImage, IKContext, IKUpload } from 'imagekitio-react';
// // required parameter to fetch images
// const urlEndpoint = 'https://ik.imagekit.io/iajwdi4bc';

// // optional parameters (needed for client-side upload)
// const publicKey = 'public_bPo9nj6bS1chtyjFAAwtbK5gNy0=';
// const authenticationEndpoint = `${process.env.REACT_APP_URL}/api/image/auth`;

// function App() {
//   const onError = (err) => {
//     console.log('Error', err);
//   };

//   const onSuccess = (res) => {
//     console.log('Success', res);
//   };
//   return (
//     <>
//       <h1>ImageKit React quick start</h1>
//       <IKContext
//         publicKey={publicKey}
//         urlEndpoint={urlEndpoint}
//         authenticationEndpoint={authenticationEndpoint}
//       >
//         <p>Upload an image</p>
//         <IKUpload
//           fileName="test-upload.png"
//           onError={onError}
//           onSuccess={onSuccess}
//         />
//       </IKContext>
//     </>
//   );
// }

export default App;
