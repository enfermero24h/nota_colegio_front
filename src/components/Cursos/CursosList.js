import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';


const CursosList = () => {
    const [cursos, setCursos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_BASE_URL}/cursos`)
            .then(response => {
                setCursos(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener los cursos:', error);
            });
    }, []);

    const handleEdit = (id) => {
        navigate(`/cursos/edit/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este curso?")) {
            axios.delete(`${API_BASE_URL}/cursos/${id}`)
                .then(response => {
                    setCursos(cursos.filter(curso => curso.id !== id));
                })
                .catch(error => {
                    console.error('Hubo un error al eliminar el curso:', error);
                });
        }
    };

    return (
        <div>
            <Typography variant="h6" component="div" gutterBottom style={{ padding: '16px' }}>
                Lista de Cursos
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/cursos/create')}
                style={{ marginBottom: '16px' }}
            >
                Crear Curso
            </Button>
            <TableContainer component={Paper}>
                <Table aria-label="tabla de cursos">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cursos.map((curso) => (
                            <TableRow key={curso.id}>
                                <TableCell>{curso.id}</TableCell>
                                <TableCell>{curso.nombre}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEdit(curso.id)}
                                        style={{ marginRight: '8px' }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(curso.id)}
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

export default CursosList;

