/* eslint-disable react/prop-types */
import { Container, Typography, Box } from '@mui/material';
import Slider from 'react-slick';
import { Item, Topbar } from './components';

function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Container sx={{ mt: 3 }}>
      <Slider settings={settings}>
        <div>
          <img src="https://cf.shopee.co.id/file/407cc913eab0e8d044efc76980f8cb3d_xxhdpi" alt="testing" width="100%" style={{ objectFit: 'cover', maxHeight: 250 }} />
        </div>
        <div>
          <img src="https://cf.shopee.co.id/file/c4d394963ffead2725339f6b91efe558_xxhdpi" alt="testing" width="100%" style={{ objectFit: 'cover', maxHeight: 250 }} />
        </div>
      </Slider>
    </Container>
  );
}

function Categories() {
  const listCategory = [
    {
      name: 'Elektronik',
      image: 'https://cf.shopee.co.id/file/dcd61dcb7c1448a132f49f938b0cb553_tn',
    },
    {
      name: 'Otomotif',
      image: 'https://cf.shopee.co.id/file/27838b968afb76ca59dd8e8f57ece91f_tn',
    },
    {
      name: 'Perawatan & Kecantikan',
      image: 'https://cf.shopee.co.id/file/ed241d7fd86a58422ddb28c2d3532094_tn',
    },
    {
      name: 'Pakaian Pria',
      image: 'https://cf.shopee.co.id/file/04dba508f1ad19629518defb94999ef9_tn',
    },
    {
      name: 'Pakaian Wanita',
      image: 'https://cf.shopee.co.id/file/23918f8dacba18c938fe42d13aa31b57_tn',
    },
    {
      name: 'Sepatu Pria',
      image: 'https://cf.shopee.co.id/file/854c575e8d48a88496f4c7f1208cd0aa_tn',
    },
    {
      name: 'Sepatu Wanita',
      image: 'https://cf.shopee.co.id/file/f1f0df2144c907abaddbdde2c58aed8d_tn',
    },
    {
      name: 'Kesehatan',
      image: 'https://cf.shopee.co.id/file/eb7d583e4b72085e71cd21a70ce47d7a_tn',
    },
  ];

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h5" fontWeight={700} mb={2} gutterBottom>Kategori</Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
      >
        { listCategory.map((category) => (
          <Box sx={{
            width: 120, border: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0.5, p: 1,
          }}
          >
            <img src={category.image} alt="testing" height={80} width={80} style={{ objectFit: 'contain' }} />
            <Typography variant="subtitle2" textAlign="center">{category.name}</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

function Products({ title, data }) {
  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h5" fontWeight={700} mb={2} gutterBottom>{title}</Typography>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        {
          data.map(() => <Item imgUrl="https://source.unsplash.com/random" />)
        }
      </Box>
    </Container>
  );
}

function App() {
  return (
    <>
      <Topbar />
      <SimpleSlider />
      <Categories />
      <Products title="Produk Terlaris" data={[1, 2, 3, 4]} />
      <Products title="Semua Produk" data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
    </>
  );
}

export default App;
