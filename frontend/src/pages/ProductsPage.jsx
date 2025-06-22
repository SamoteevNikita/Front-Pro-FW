import React, { useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import EditProductModal from '../components/EditProductModal';


const mockProducts = [
  { id: 1, name: 'Бургер', category: 'Fast Food', quantity: 10, price: 99, description: 'Смачний бургер' },
  { id: 2, name: 'Шаурма', category: 'Fast Food', quantity: 15, price: 79, description: 'Ароматна шаурма' },
  { id: 3, name: 'Лапша', category: 'Asian', quantity: 20, price: 69, description: 'Тепла лапша' },
];


const ProductsPage = () => {
  const [products, setProducts] = useState(mockProducts);
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState(false); 
  const [productToDelete, setProductToDelete] = useState(null);

  const [ editOpen, setEditOpen] = useState(false)
  const [ editedProduct, setEditedProduct] = useState({
    id: null,
    category: '',
    name: '',
    quantity: '',
    price: '',
    description: '',
  })

  const handleEditOpen = (product) => {
    setEditedProduct(product)
    setEditOpen(true)
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = () => {
    setProducts((prev) =>
      prev.map((p) => (p.id === editedProduct.id ? editedProduct : p))
    );
    setEditOpen(false);
  };

  const handleOpenConfirm = (product) => {
    setProductToDelete(product)
    setOpenConfirm(true)
  }
  const handleCloseConfirm = () => {
    setProductToDelete(null);
    setOpenConfirm(false);
  };
  const handleConfirmDelete = () => {
    if (productToDelete) {
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      handleCloseConfirm();
    }
  };

  return (
  <Box p={3}>
    <Typography variant="h4" mb={3}>Список продуктів</Typography>

    
    <Box display="flex" justifyContent="space-between" mb={2}>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate('/preview')}
      >
        Preview
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={() => alert('Тут буде модалка для додавання продукту')}
      >
        Додати продукт
      </Button>
    </Box>

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Назва</TableCell>
            <TableCell>Ціна</TableCell>
            <TableCell>Опис</TableCell>
            <TableCell align="center">Дії</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price} грн</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell align="center">
                <IconButton
                  color="primary"
                  onClick={() => handleEditOpen(product)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleOpenConfirm(product)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    
    <Dialog
      open={openConfirm}
      onClose={handleCloseConfirm}
      aria-labelledby="confirm-dialog-title"
    >
      <DialogTitle id="confirm-dialog-title">Підтвердження видалення</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ви впевнені, що хочете видалити продукт{' '}
          <strong>{productToDelete?.name}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseConfirm} color="primary">
          Закрити
        </Button>
        <Button onClick={handleConfirmDelete} color="error" variant="contained">
          Підтвердити
        </Button>
      </DialogActions>
    </Dialog>

   
    <EditProductModal
      open={editOpen}
      onClose={() => setEditOpen(false)}
      onSubmit={handleEditSubmit}
      product={editedProduct}
      onChange={handleEditChange}
    />
  </Box>
);

};

export default ProductsPage;