import axios from 'axios';
import React from 'react';
import { API_BASE_URL } from '../../config'; // Importa la constante

const CursoDelete = ({ id, onDelete }) => {
    const handleDelete = () => {
        axios.delete(`${API_BASE_URL}/cursos/${id}`)
            .then(response => {
                alert('Curso eliminado exitosamente');
                onDelete(id);
            })
            .catch(error => {
                console.error('Hubo un error al eliminar el curso:', error);
            });
    }

    return (
        <button onClick={handleDelete}>Eliminar</button>
    );
}

export default CursoDelete;
