import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';


const PreviewPage = () => {
  const [ products, setProducts ] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Помилка завантаження продуктів', err));
  }, [])

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Grid container spacing={3} justifyContent="center" maxWidth="lg">
        {products.map(product => (
          <Grid item key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>

  );
};

export default PreviewPage;
    