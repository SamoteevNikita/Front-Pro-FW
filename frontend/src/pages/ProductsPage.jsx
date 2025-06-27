import { useSelector, useDispatch } from 'react-redux';
import {
 fetchProducts,
} from '../redux/products/thunk';
import { addProduct, updateProduct, deleteProduct } from '../redux/products/productsSlice'; 
import React, { useEffect, useState } from 'react';
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


const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   
  const products = useSelector((state) => state.products.item)
  const loading = useSelector((state) => state.products.loading)
  const error = useSelector((state) => state.products.error)
  
  const [openConfirm, setOpenConfirm] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [ editOpen, setEditOpen] = useState(false)


  const [editedProduct, setEditedProduct] = useState({
    id: null,
    category: '',
    name: '',
    quantity: '',
    price: '',
    description: '',
    photo: ''
  });

  const [newProduct, setNewProduct] = useState({
    id: null,
    category: '',
    name: '',
    quantity: '',
    price: '',
    description: '',
    photo: ''
  });

  const [productToDelete, setProductToDelete] = useState(null)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddSubmit = () => {
    dispatch(addProduct({ ...newProduct }));
    setNewProduct({
      id: null,
      category: '',
      name: '',
      quantity: '',
      price: '',
      description: '',
      photo: ''
    });
    setAddOpen(false);
  };


  const handleEditOpen = (product) => {
    setEditedProduct(product);
    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = () => {
    dispatch(updateProduct(editedProduct));
    setEditOpen(false);
  };

  const handleOpenConfirm = (product) => {
    setProductToDelete(product);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setProductToDelete(null);
    setOpenConfirm(false);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete.id));
      handleCloseConfirm();
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Список продуктів
      </Typography>

      {loading && <Typography>Завантаження...</Typography>}
      {error && <Typography color="error">Помилка: {error}</Typography>}

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button variant="outlined" color="secondary" onClick={() => navigate('/preview')}>
          Preview
        </Button>

        <Button variant="contained" color="primary" onClick={() => setAddOpen(true)}>
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
                  <IconButton color="primary" onClick={() => handleEditOpen(product)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleOpenConfirm(product)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>Підтвердження видалення</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ви впевнені, що хочете видалити продукт <strong>{productToDelete?.name}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Скасувати</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Підтвердити
          </Button>
        </DialogActions>
      </Dialog>

      <EditProductModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={handleAddSubmit}
        product={newProduct}
        onChange={handleAddChange}
        isEdit={false}
      />

      <EditProductModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSubmit={handleEditSubmit}
        product={editedProduct}
        onChange={handleEditChange}
        isEdit={true}
      />
    </Box>
  );

};

export default ProductsPage;
