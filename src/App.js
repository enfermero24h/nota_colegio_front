import { AppBar, Box, Button, Container, CssBaseline, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CursoCreate from './components/Cursos/CursoCreate';
import CursoEdit from './components/Cursos/CursoEdit';
import CursosList from './components/Cursos/CursosList';
import EstudianteCreate from './components/Estudiantes/EstudianteCreate';
import EstudianteEdit from './components/Estudiantes/EstudianteEdit';
import EstudiantesList from './components/Estudiantes/EstudiantesList';
import MateriaCreate from './components/Materias/MateriaCreate';
import MateriaEdit from './components/Materias/MateriaEdit';
import MateriasList from './components/Materias/MateriasList';
import NotaCreate from './components/Notas/NotaCreate';
import NotaEdit from './components/Notas/NotaEdit';
import NotasList from './components/Notas/NotasList';
import GetUsersAndMostUsedLetter from './components/UsersAndMostUsedLetter/GetUsersAndMostUsedLetter';

function App() {
    return (
        <Router>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Sistema de Gestión de Notas
                    </Typography>
                    <Button color="inherit" component={Link} to="/estudiantes">Estudiantes</Button>
                    <Button color="inherit" component={Link} to="/cursos">Cursos</Button>
                    <Button color="inherit" component={Link} to="/materias">Materias</Button>
                    <Button color="inherit" component={Link} to="/notas">Notas</Button>
                    <Button color="inherit" component={Link} to="/get-users-and-most-used-letter">Usuarios y Letra más Usada</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Box sx={{ marginTop: 4 }}>
                    <Routes>
                        {/* Rutas para Estudiantes */}
                        <Route path="/estudiantes" element={<EstudiantesList />} />
                        <Route path="/estudiantes/create" element={<EstudianteCreate />} />
                        <Route path="/estudiantes/edit/:id" element={<EstudianteEdit />} />

                        {/* Rutas para Cursos */}
                        <Route path="/cursos" element={<CursosList />} />
                        <Route path="/cursos/create" element={<CursoCreate />} />
                        <Route path="/cursos/edit/:id" element={<CursoEdit />} />

                        {/* Rutas para Materias */}
                        <Route path="/materias" element={<MateriasList />} />
                        <Route path="/materias/create" element={<MateriaCreate />} />
                        <Route path="/materias/edit/:id" element={<MateriaEdit />} />

                        {/* Rutas para Notas */}
                        <Route path="/notas" element={<NotasList />} />
                        <Route path="/notas/create" element={<NotaCreate />} />
                        <Route path="/notas/edit/:id" element={<NotaEdit />} />

                        {/* Ruta para GetUsersAndMostUsedLetter */}
                        <Route path="/get-users-and-most-used-letter" element={<GetUsersAndMostUsedLetter />} />
                    </Routes>
                </Box>
            </Container>
        </Router>
    );
}

export default App;
