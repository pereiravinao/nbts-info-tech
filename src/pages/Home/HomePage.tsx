import React, { } from 'react';
import Header from '../../components/Header';
import { Container, Typography, Box } from '@mui/material';

const HomePage: React.FC = () => {
    return (
        <>
            <Header />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Página Inicial
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Bem-vindo à página inicial da plataforma Nbts Info.
                    </Typography>
                </Box>
            </Container>
        </>
    );
};

export default HomePage;