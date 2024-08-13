// src/components/Notas/NotaEdit.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../config'; // Importa la constante

const NotaEdit = () => {
    const { id } = useParams();
    const [estudiantes, setEstudiantes] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [estudianteId, setEstudianteId] = useState('');
    const [cursoId, setCursoId] = useState('');
    const [materiaId, setMateriaId] = useState('');
    const [calificacion, setCalificacion] = useState('');

    useEffect(() => {
        axios.get(`${API_BASE_URL}/notas/${id}`).then(response => {
            const nota = response.data;
            setEstudianteId(nota.estudiante_id);
            setCursoId(nota.curso_id);
            setMateriaId(nota.materia_id);
            setCalificacion(nota.calificacion);
        });

        axios.get('http://tu-ip-publica/api/estudiantes').then(response => setEstudiantes(response.data));
        axios.get('http://tu-ip-publica/api/cursos').then(response => setCursos(response.data));
        axios.get('http://tu-ip-publica/api/materias').then(response => setMaterias(response.data));
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`http://tu-ip-publica/api/notas/${id}`, {
            estudiante_id: estudianteId,
            curso_id: cursoId,
            materia_id: materiaId,
            calificacion
        })
        .then(response => {
            alert('Nota actualizada exitosamente');
        })
        .catch(error => {
            console.error('Hubo un error al actualizar la nota:', error);
        });
    }

    return (
        <div>
            <h2>Editar Nota</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Estudiante:</label>
                    <select value={estudianteId} onChange={(e) => setEstudianteId(e.target.value)} required>
                        <option value="">Seleccione un estudiante</option>
                        {estudiantes.map(est => (
                            <option key={est.id} value={est.id}>{est.nombre} {est.apellido}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Curso:</label>
                    <select value={cursoId} onChange={(e) => setCursoId(e.target.value)} required>
                        <option value="">Seleccione un curso</option>
                        {cursos.map(curso => (
                            <option key={curso.id} value={curso.id}>{curso.nombre}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Materia:</label>
                    <select value={materiaId} onChange={(e) => setMateriaId(e.target.value)} required>
                        <option value="">Seleccione una materia</option>
                        {materias.map(materia => (
                            <option key={materia.id} value={materia.id}>{materia.nombre}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Calificación:</label>
                    <input
                        type="number"
                        value={calificacion}
                        onChange={(e) => setCalificacion(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Actualizar Nota</button>
            </form>
        </div>
    );
}

export default NotaEdit;
