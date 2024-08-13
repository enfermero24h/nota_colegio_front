// src/components/Notas/NotaDelete.js
import axios from 'axios';
import React from 'react';
import { API_BASE_URL } from '../../config'; // Importa la constante

const NotaDelete = ({ id, onDelete }) => {
    const handleDelete = () => {
        axios.delete(`${API_BASE_URL}/notas/${id}`)
            .then(response => {
                alert('Nota eliminada exitosamente');
                onDelete(id);
            })
            .catch(error => {
                console.error('Hubo un error al eliminar la nota:', error);
            });
    }

    return (
        <button onClick={handleDelete}>Eliminar</button>
    );
}

export default NotaDelete;
