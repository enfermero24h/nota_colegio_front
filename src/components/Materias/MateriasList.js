import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para la navegación
import { API_BASE_URL } from '../../config';



const MateriasList = () => {
    const [materias, setMaterias] = useState([]);
    const navigate = useNavigate(); // Hook para la navegación

    useEffect(() => {
        axios.get(`${API_BASE_URL}/materias`)
            .then(response => {
                setMaterias(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener las materias:', error);
            });
    }, []);

    const handleEdit = (id) => {
        navigate(`/materias/edit/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta materia?")) {
            axios.delete(`${API_BASE_URL}/materias/${id}`)
                .then(response => {
                    setMaterias(materias.filter(materia => materia.id !== id));
                })
                .catch(error => {
                    console.error('Hubo un error al eliminar la materia:', error);
                });
        }
    };

    return (
        <div>
            <Typography variant="h6" component="div" gutterBottom style={{ padding: '16px' }}>
                Lista de Materias
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/materias/create')}
                style={{ marginBottom: '16px' }}
            >
                Crear Materia
            </Button>
            <TableContainer component={Paper}>
                <Table aria-label="tabla de materias">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {materias.map((materia) => (
                            <TableRow key={materia.id}>
                                <TableCell>{materia.id}</TableCell>
                                <TableCell>{materia.nombre}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEdit(materia.id)}
                                        style={{ marginRight: '8px' }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(materia.id)}
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

export default MateriasList;
