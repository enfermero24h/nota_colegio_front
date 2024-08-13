import { Box, Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { API_BASE_URL } from '../../config';


const EstudianteCreate = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`${API_BASE_URL}/estudiantes`, {
            nombre,
            apellido,
            email
        })
        .then(response => {
            alert('Estudiante creado exitosamente');
            // Limpiar el formulario
            setNombre('');
            setApellido('');
            setEmail('');
        })
        .catch(error => {
            console.error('Hubo un error al crear el estudiante:', error);
        });
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Crear Estudiante
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
                        label="Apellido"
                        variant="outlined"
                        margin="normal"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Crear Estudiante
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default EstudianteCreate;

