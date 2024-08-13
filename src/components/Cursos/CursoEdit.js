import { Box, Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../config';


const CursoEdit = () => {
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    useEffect(() => {
        axios.get(`${API_BASE_URL}/cursos/${id}`)
            .then(response => {
                setNombre(response.data.nombre);
                setDescripcion(response.data.descripcion);
            })
            .catch(error => {
                console.error('Hubo un error al obtener el curso:', error);
            });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`${API_BASE_URL}/cursos/${id}`, {
            nombre,
            descripcion
        })
        .then(response => {
            alert('Curso actualizado exitosamente');
        })
        .catch(error => {
            console.error('Hubo un error al actualizar el curso:', error);
        });
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Editar Curso
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
                        Actualizar Curso
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default CursoEdit;
