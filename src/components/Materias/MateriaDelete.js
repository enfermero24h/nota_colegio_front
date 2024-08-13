// src/components/Materias/MateriaDelete.js
import axios from 'axios';
import React from 'react';
import { API_BASE_URL } from '../../config'; // Importa la constante

const MateriaDelete = ({ id, onDelete }) => {
    const handleDelete = () => {
        axios.delete(`${API_BASE_URL}/materias/${id}`)
            .then(response => {
                alert('Materia eliminada exitosamente');
                onDelete(id);
            })
            .catch(error => {
                console.error('Hubo un error al eliminar la materia:', error);
            });
    }

    return (
        <button onClick={handleDelete}>Eliminar</button>
    );
}

export default MateriaDelete;
