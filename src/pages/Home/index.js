/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import {
  Container, Typography, Box, Grid,
} from '@mui/material';
import { useState, useEffect } from 'react';
// import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { getCategory, getProducts } from '../../utils';
import { CardProduct } from '../../components';

// function SimpleSlider() {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     cssEase: 'linear',
//   };
//   const listSlide = [
//     { image: 'https://cf.shopee.co.id/file/407cc913eab0e8d044efc76980f8cb3d_xxhdpi' },
//     { image: 'https://cf.shopee.co.id/file/c4d394963ffead2725339f6b91efe558_xxhdpi' },
//     { image: 'https://cf.shopee.co.id/file/57d18ed289a17ea995e762511d801b5d_xxhdpi' },
//   ];
//   return (
//     <Container sx={{ p: { xs: 0 } }}>
//       <Slider {...settings}>
//         { listSlide.map((slide) => (
//           <Box key={slide.image} sx={{ borderRadius: { sm: 0, lg: 2 }, overflow: 'hidden' }}>
//             <img src={slide.image} alt="testing" width="100%" style={{ objectFit: 'cover', maxHeight: 250 }} />
//           </Box>
//         ))}
//       </Slider>
//     </Container>
//   );
// }

function Categories() {
  const navigate = useNavigate();
  const [categoriesState, setCategoriesState] = useState({
    loading: false,
    data: null,
    message: null,
  });

  const fetchCategories = async () => {
    setCategoriesState({ ...categoriesState, loading: true });
    try {
      const categories = await getCategory();
      if (categories.status !== 'success') {
        throw new Error(categories.message);
      }
      setCategoriesState({
        ...categoriesState,
        loading: false,
        data: categories.data,
      });
    } catch (err) {
      setCategoriesState({
        ...categoriesState,
        loading: false,
        message: err.message,
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Container sx={{ my: 6 }}>
      <Typography variant="h5" fontWeight={700} mb={{ xs: 2, lg: 4 }} gutterBottom>Kategori</Typography>
      { categoriesState.loading && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">Loading ...</Typography>
        </Box>
      )}
      { (!categoriesState.loading && categoriesState.message) && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">{categoriesState.message}</Typography>
        </Box>
      )}
      { (!categoriesState.loading && categoriesState.data) && (
        <Grid container>
          { categoriesState.data.map((category) => (
            <Grid item xs={4} sm={3} md={2} lg={1.5} border={1} borderColor="divider" onClick={() => navigate(`category/${category.name}`)} sx={{ cursor: 'pointer' }}>
              <Box
                key={category.name}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 0.5,
                  p: 1,
                }}
              >
                <img src={category.foto} alt="testing" height={80} width={80} style={{ objectFit: 'contain' }} />
                <Typography variant="subtitle2" textAlign="center">{category.name}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

function Products({ title }) {
  const [productsState, setProductsState] = useState({
    loading: false,
    data: null,
    message: null,
  });

  const fetchProducts = async () => {
    setProductsState({ ...productsState, loading: true });
    try {
      const products = await getProducts();
      if (products.status !== 'success') {
        throw new Error(products.message);
      }
      setProductsState({
        ...productsState,
        loading: false,
        data: products.data,
      });
    } catch (err) {
      setProductsState({
        ...productsState,
        loading: false,
        message: err.message,
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container sx={{ my: 6 }}>
      <Typography variant="h5" fontWeight={700} mb={4} gutterBottom>{title}</Typography>
      { productsState.loading && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">Loading ...</Typography>
        </Box>
      )}
      { (!productsState.loading && productsState.message) && (
        <Box py={6} display="flex" justifyContent="center">
          <Typography color="text.secondary">{productsState.message}</Typography>
        </Box>
      )}
      { (!productsState.loading && productsState.data) && (
        <Grid container spacing={{ xs: 1, lg: 1.5 }}>
          {
            productsState.data.map((row) => (
              <Grid item xs={6} sm={3} lg={2}>
                <CardProduct key={row.name} data={row} />
              </Grid>
            ))
          }
        </Grid>
      )}
    </Container>
  );
}

function Home() {
  return (
    <>
      {/* <SimpleSlider /> */}
      <Categories />
      <Products title="Produk Terlaris" />
      <Products title="Semua Produk" />
    </>
  );
}

export default Home;
