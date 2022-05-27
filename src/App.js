import { Container, Typography, Box } from '@mui/material';
import { Item, Topbar } from './components';

function App() {
  return (
    <>
      <Topbar />
      <Container sx={{ my: 4 }}>
        <Typography variant="h5" fontWeight={700} mb={2} gutterBottom>Produk Terlaris</Typography>
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {
            [1, 2, 3, 4, 5, 6, 7, 8].map(() => <Item imgUrl="https://source.unsplash.com/random" />)
          }
        </Box>
      </Container>
    </>
  );
}

export default App;
