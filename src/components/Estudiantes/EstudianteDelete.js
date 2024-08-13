// src/components/Estudiantes/EstudianteDelete.js
import axios from 'axios';
import React from 'react';
import { API_BASE_URL } from '../../config'; // Importa la constante

const EstudianteDelete = ({ id, onDelete }) => {
    const handleDelete = () => {
        axios.delete(`${API_BASE_URL}/estudiantes/${id}`)
            .then(response => {
                alert('Estudiante eliminado exitosamente');
                onDelete(id);
            })
            .catch(error => {
                console.error('Hubo un error al eliminar el estudiante:', error);
            });
    }

    return (
        <button onClick={handleDelete}>Eliminar</button>
    );
}

export default EstudianteDelete;
