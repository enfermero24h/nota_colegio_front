import axios from 'axios';
import React, { useState } from 'react';
import { API_BASE_URL } from '../../config'; // Importa la constante


const CursoCreate = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`${API_BASE_URL}/cursos`, {
            nombre,
            descripcion
        })
        .then(response => {
            alert('Curso creado exitosamente');
            // Limpiar el formulario
            setNombre('');
            setDescripcion('');
        })
        .catch(error => {
            console.error('Hubo un error al crear el curso:', error);
        });
    }

    return (
        <div>
            <h2>Crear Curso</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <input
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Crear Curso</button>
            </form>
        </div>
    );
}

export default CursoCreate;
