import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config';

const NotaCreate = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [estudianteId, setEstudianteId] = useState('');
    const [cursoId, setCursoId] = useState('');
    const [materiaId, setMateriaId] = useState('');
    const [calificacion, setCalificacion] = useState('');

    useEffect(() => {
        axios.get(`${API_BASE_URL}/estudiantes`).then(response => setEstudiantes(response.data));
        axios.get(`${API_BASE_URL}/cursos`).then(response => setCursos(response.data));
        axios.get(`${API_BASE_URL}/materias`).then(response => setMaterias(response.data));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`${API_BASE_URL}/notas`, {
            estudiante_id: estudianteId,
            curso_id: cursoId,
            materia_id: materiaId,
            calificacion
        })
        .then(response => {
            alert('Nota creada exitosamente');
            // Limpiar el formulario
            setEstudianteId('');
            setCursoId('');
            setMateriaId('');
            setCalificacion('');
        })
        .catch(error => {
            console.error('Hubo un error al crear la nota:', error);
        });
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Crear Nota
            </Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="estudiante-label">Estudiante</InputLabel>
                    <Select
                        labelId="estudiante-label"
                        value={estudianteId}
                        onChange={(e) => setEstudianteId(e.target.value)}
                        required
                    >
                        <MenuItem value="">
                            <em>Seleccione un estudiante</em>
                        </MenuItem>
                        {estudiantes.map(est => (
                            <MenuItem key={est.id} value={est.id}>
                                {est.nombre} {est.apellido}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel id="curso-label">Curso</InputLabel>
                    <Select
                        labelId="curso-label"
                        value={cursoId}
                        onChange={(e) => setCursoId(e.target.value)}
                        required
                    >
                        <MenuItem value="">
                            <em>Seleccione un curso</em>
                        </MenuItem>
                        {cursos.map(curso => (
                            <MenuItem key={curso.id} value={curso.id}>
                                {curso.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel id="materia-label">Materia</InputLabel>
                    <Select
                        labelId="materia-label"
                        value={materiaId}
                        onChange={(e) => setMateriaId(e.target.value)}
                        required
                    >
                        <MenuItem value="">
                            <em>Seleccione una materia</em>
                        </MenuItem>
                        {materias.map(materia => (
                            <MenuItem key={materia.id} value={materia.id}>
                                {materia.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Calificación"
                    type="number"
                    value={calificacion}
                    onChange={(e) => setCalificacion(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />

                <Button variant="contained" color="primary" type="submit" fullWidth sx={{ marginTop: 2 }}>
                    Crear Nota
                </Button>
            </form>
        </Container>
    );
}

export default NotaCreate;
