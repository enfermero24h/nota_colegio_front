import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redireccionar a la página de edición
import { API_BASE_URL } from '../../config'; // Asegúrate de que esta constante esté definida en config.js

const EstudiantesList = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const navigate = useNavigate(); // Hook para la navegación

    useEffect(() => {
        axios.get(`${API_BASE_URL}/estudiantes`)
            .then(response => {
                setEstudiantes(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener los estudiantes:', error);
            });
    }, []);

    const handleEdit = (id) => {
        navigate(`/estudiantes/edit/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este estudiante?")) {
            axios.delete(`${API_BASE_URL}/estudiantes/${id}`)
                .then(response => {
                    setEstudiantes(estudiantes.filter(est => est.id !== id));
                })
                .catch(error => {
                    console.error('Hubo un error al eliminar el estudiante:', error);
                });
        }
    };

    return (
        <div>
            <Typography variant="h6" component="div" gutterBottom style={{ padding: '16px' }}>
                Lista de Estudiantes
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/estudiantes/create')}
                style={{ marginBottom: '16px' }}
            >
                Crear Estudiante
            </Button>
            <TableContainer component={Paper}>
                <Table aria-label="tabla de estudiantes">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {estudiantes.map((estudiante) => (
                            <TableRow key={estudiante.id}>
                                <TableCell>{estudiante.id}</TableCell>
                                <TableCell>{estudiante.nombre}</TableCell>
                                <TableCell>{estudiante.apellido}</TableCell>
                                <TableCell>{estudiante.email}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEdit(estudiante.id)}
                                        style={{ marginRight: '8px' }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(estudiante.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default EstudiantesList;
