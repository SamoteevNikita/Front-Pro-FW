import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Button,
  Box,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const EditProductModal = ({open, onClose, onSubmit, product, onChange}) => {
    return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box p={2} position="relative">
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">Edit product</Typography>
        </DialogTitle>

        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          <TextField
            label="Category"
            fullWidth
            margin="normal"
            name="category"
            value={product.category}
            onChange={onChange}
          />
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            name="name"
            value={product.name}
            onChange={onChange}
          />
          <TextField
            label="Quantity"
            type="number"
            fullWidth
            margin="normal"
            name="quantity"
            value={product.quantity}
            onChange={onChange}
          />
          <TextField
            label="Price"
            type="number"
            fullWidth
            margin="normal"
            name="price"
            value={product.price}
            onChange={onChange}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            name="description"
            value={product.description}
            onChange={onChange}
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={onClose}
            sx={{
              backgroundColor: '#A9A9A9',
              color: '#fff',
              '&:hover': { backgroundColor: '#888' }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            sx={{
              backgroundColor: '#4CAF50',
              color: '#fff',
              '&:hover': { backgroundColor: '#388E3C' }
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default EditProductModal;