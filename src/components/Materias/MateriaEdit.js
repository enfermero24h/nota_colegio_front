import { Box, Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../config';


const MateriaEdit = () => {
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    useEffect(() => {
        axios.get(`${API_BASE_URL}/materias/${id}`)
            .then(response => {
                setNombre(response.data.nombre);
                setDescripcion(response.data.descripcion);
            })
            .catch(error => {
                console.error('Hubo un error al obtener la materia:', error);
            });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`${API_BASE_URL}/materias/${id}`, {
            nombre,
            descripcion
        })
        .then(response => {
            alert('Materia actualizada exitosamente');
        })
        .catch(error => {
            console.error('Hubo un error al actualizar la materia:', error);
        });
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Editar Materia
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
                        Actualizar Materia
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default MateriaEdit;

