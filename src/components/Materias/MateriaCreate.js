import { Box, Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { API_BASE_URL } from '../../config';


const MateriaCreate = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`${API_BASE_URL}/materias`, {
            nombre,
            descripcion
        })
        .then(response => {
            alert('Materia creada exitosamente');
            // Limpiar el formulario
            setNombre('');
            setDescripcion('');
        })
        .catch(error => {
            console.error('Hubo un error al crear la materia:', error);
        });
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Crear Materia
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Nombre"
                        variant="outlined"
                        margin="normal"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Descripción"
                        variant="outlined"
                        margin="normal"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Crear Materia
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default MateriaCreate;

