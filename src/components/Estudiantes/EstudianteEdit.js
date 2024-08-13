import { Box, Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../config'; // Importa la constante

const EstudianteEdit = () => {
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        axios.get(`${API_BASE_URL}/estudiantes/${id}`)
            .then(response => {
                setNombre(response.data.nombre);
                setApellido(response.data.apellido);
                setEmail(response.data.email);
            })
            .catch(error => {
                console.error('Hubo un error al obtener el estudiante:', error);
            });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`${API_BASE_URL}/estudiantes/${id}`, {
            nombre,
            apellido,
            email
        })
        .then(response => {
            alert('Estudiante actualizado exitosamente');
        })
        .catch(error => {
            console.error('Hubo un error al actualizar el estudiante:', error);
        });
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Editar Estudiante
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
                        Actualizar Estudiante
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default EstudianteEdit;

