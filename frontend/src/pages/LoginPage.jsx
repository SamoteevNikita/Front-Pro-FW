import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import {
  Box, Button, TextField, IconButton, InputAdornment, Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [ showPassword, setShowPassword ] = useState(false);
  const navigate = useNavigate();

  const onSubmit = ({username, password}) => {
    if (username && password) {
      localStorage.setItem('token', 'fakeToken123');
      navigate('/products');
    }
  };

  const validate = values => {
    const errors = {};
    if (!values.username) errors.username = 'Обязательное поле';
    if (!values.password) errors.password = 'Обязательное поле';
    return errors;
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Box width={300}>
        <Typography variant="h5" mb={2}>Вхід</Typography>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="username">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="Логін"
                    fullWidth
                    margin="normal"
                    error={meta.touched && meta.error}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>

              <Field name="password">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="Пароль"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    margin="normal"
                    error={meta.touched && meta.error}
                    helperText={meta.touched && meta.error}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(prev => !prev)}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              </Field>

              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Увійти
              </Button>
            </form>
          )}
        />
      </Box>
    </Box>
  );
}

export default Login;
