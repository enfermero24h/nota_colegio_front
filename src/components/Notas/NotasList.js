import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

const NotasList = () => {
    const [notas, setNotas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_BASE_URL}/notas`)
            .then(response => {
                const notas = response.data;

                // Realizar consultas adicionales para obtener los detalles
                const estudiantesPromises = notas.map(nota => axios.get(`${API_BASE_URL}/estudiantes/${nota.estudiante_id}`));
                const materiasPromises = notas.map(nota => axios.get(`${API_BASE_URL}/materias/${nota.materia_id}`));
                const cursosPromises = notas.map(nota => axios.get(`${API_BASE_URL}/cursos/${nota.curso_id}`));

                Promise.all([...estudiantesPromises, ...materiasPromises, ...cursosPromises])
                    .then(results => {
                        const estudiantes = results.slice(0, notas.length).map(res => res.data);
                        const materias = results.slice(notas.length, notas.length * 2).map(res => res.data);
                        const cursos = results.slice(notas.length * 2).map(res => res.data);

                        const notasCompletas = notas.map((nota, index) => ({
                            ...nota,
                            estudiante: estudiantes[index],
                            materia: materias[index],
                            curso: cursos[index]
                        }));

                        setNotas(notasCompletas);
                        setLoading(false);
                    })
                    .catch(err => {
                        setError('Hubo un error al obtener los detalles de las notas.');
                        setLoading(false);
                    });
            })
            .catch(error => {
                setError('Hubo un error al obtener las notas.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Typography variant="h6" align="center">Cargando...</Typography>;
    }

    if (error) {
        return <Typography variant="h6" color="error" align="center">{error}</Typography>;
    }

    const handleAddNota = () => {
        navigate('/notas/create'); // Asume que tienes una ruta para crear nuevas notas
    };

    return (
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
            <Typography variant="h5" component="div" align="center" gutterBottom style={{ padding: '16px' }}>
                Lista de Notas
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddNota}
                sx={{ marginBottom: 2, marginLeft: 2 }}
            >
                Agregar Nota
            </Button>
            <Table aria-label="tabla de notas">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Estudiante</TableCell>
                        <TableCell>Curso</TableCell>
                        <TableCell>Materia</TableCell>
                        <TableCell>Nota</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {notas.map((nota) => (
                        <TableRow key={nota.id}>
                            <TableCell>{nota.id}</TableCell>
                            <TableCell>{nota.estudiante.nombre} {nota.estudiante.apellido}</TableCell>
                            <TableCell>{nota.curso.nombre}</TableCell>
                            <TableCell>{nota.materia.nombre}</TableCell>
                            <TableCell>{nota.nota}</TableCell>
                            <TableCell align="center">
                                <Button variant="contained" color="primary" sx={{ marginRight: 1 }}>
                                    Editar
                                </Button>
                                <Button variant="contained" color="secondary">
                                    Eliminar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default NotasList;
