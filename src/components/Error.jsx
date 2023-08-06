import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, } from "@mui/material";
import { SentimentDissatisfiedOutlined as SadIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";

const Error = () => {

    const themeMode = useSelector((state) => state.theme.themeMode)

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            sx={{ background: themeMode === 'light' ? '#F3F3F3' : 'rgba(218, 220, 224, 0.03)' }}
        >

            <Typography variant="h3" component="h1" mb={2} sx={{ color: themeMode === 'light' ? "#202537" : '#FFF', }}>
                Oops! <SadIcon sx={{ fontSize: "2rem", ml: 1 }} />
            </Typography>
            <Typography variant="body1" align="center" mb={4} sx={{ color: themeMode === 'light' ? "#202537" : '#FFF', }}>
                You seem to be lost in the woods of the internet.
            </Typography>
            <Button variant="outlined" component={Link} to="/"
                sx={{
                    mt: '40px',
                    backgroundColor: themeMode === 'light' ? '#F3F3F3' : 'rgba(218, 220, 224, 0.03)',
                    color: themeMode === 'light' ? "#202537" : '#FFF',
                    borderColor: themeMode === 'light' ? "#202537" : '#FFF',
                    '&:hover': {
                        borderColor: themeMode === 'light' ? "#202537" : '#FFF',
                    },
                    '&:active': {
                        borderColor: themeMode === 'light' ? "#202537" : '#FFF',
                        boxShadow: 'none',
                    },
                    '&:focus': {
                        borderColor: themeMode === 'light' ? "#202537" : '#FFF',
                        outline: 'none',
                    },
                }}
            >
                Let's go back home
            </Button>

        </Box >
    );
};

export default Error;
