import React from 'react';
import {
  Card, CardMedia, CardContent, Typography, Box, IconButton
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';


const ProductCard = ({ product }) => {
    const navigate = useNavigate()

    return (
        <Card
      sx={{ maxWidth: 250, cursor: 'pointer' }}
      onClick={() => navigate(`/preview/${product.id}`)}
    >
      <CardMedia
        component="img"
        height="160"
        image={product.photo}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="body1" fontWeight="bold">
          {product.name}
        </Typography>
        <Typography variant="h6" color="error">
          {product.price}₴
        </Typography>
        <Typography>Кількість: {product.quantity}</Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <IconButton disabled size="small">
            <ShoppingCartIcon color="success" />
          </IconButton>
          <Typography variant="body2" color="green">
            Готовий до відправки
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;