import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config';

const GetUsersAndMostUsedLetter = () => {
    const [users, setUsers] = useState([]);
    const [mostUsedLetter, setMostUsedLetter] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = () => {
        setLoading(true);
        setError(null);

        axios.get(`${API_BASE_URL}/random-users`)
            .then(response => {
                setUsers(response.data.users);
                setMostUsedLetter(response.data.letra_mas_utilizada); // Aquí utilizamos la propiedad en español
                setLoading(false);
            })
            .catch(error => {
                setError('Hubo un error al obtener los datos.');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData(); // Cargar los datos cuando el componente se monta
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 4, textAlign: 'center' }}>
                <Typography variant="h4" component="div" gutterBottom>
                    Letra más utilizada
                </Typography>
                <Box
                    sx={{
                        display: 'inline-block',
                        padding: 2,
                        border: '2px solid #3f51b5',
                        borderRadius: '4px',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: '#3f51b5',
                    }}
                >
                    {mostUsedLetter.toUpperCase()}
                </Box>
                <Typography variant="subtitle1" component="div" gutterBottom>
                    Esta es la letra que más se repite en los nombres de los usuarios generados.
                </Typography>
            </Paper>

            <Button
                variant="contained"
                color="primary"
                onClick={fetchData}
                sx={{ marginBottom: 2 }}
            >
                Actualizar
            </Button>

            <Typography variant="h5" gutterBottom>
                Usuarios Generados Aleatoriamente
            </Typography>
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>País</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user.name.first}</TableCell>
                                <TableCell>{user.name.last}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.location.country}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default GetUsersAndMostUsedLetter;
