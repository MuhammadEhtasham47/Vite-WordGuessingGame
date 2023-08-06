// Signup.jsx
import React from "react";
import { Container, Box, Typography, TextField, Button, Link, FormHelperText } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ErrorOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { privateRequest, publicRequest } from "../apiRequests";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { loginSuccess } from "../redux/authSlice";

const Signup = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Email is equired"),
        password: Yup.string().required("Password is required"),
    });

    const handleSubmit = (values) => {

        const apiObject = {
            "password": values.password,
            "email": values.email
        }

        publicRequest.post('user/sign-up', apiObject)
            .then(() => {
                handleLogin(apiObject)
            })
            .catch((error) => {
                toast.error('Issue while signing-up')
            })
    };

    const handleLogin = (apiObject) => {
        publicRequest.post('user/login-user', apiObject)
            .then((response) => {
                dispatch(loginSuccess(response))
                toast.success('Signup successfull 🎉')
                handleSetStast()
            })
            .catch((error) => {
                toast.error('Loging in failed')
            })
    }

    const handleSetStast = () => {
        let apiObject = {
            "gamesPlayed": "0",
            "gamesWon": "0",
            "percentageOfWin": "0",
            "bestTry": "0",
            "currentStreak": "0",
            "maxStreak": "0"
        }
        privateRequest.post('stats/add-stats', apiObject)
            .then((response) => {
                navigate('/')
            })
            .catch((error) => {
                toast.error("Stats couldn't be added")
            })
    }

    const themeMode = useSelector((state) => state.theme.themeMode)

    return (

        <Box sx={{ minHeight: "100vh", minWidth: '100vw', background: themeMode === 'light' ? '#F3F3F3' : 'rgba(218, 220, 224, 0.03)', display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: "center", }}>
            <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: "center", }}>

                <Typography variant="h4" align="center" mb={3}>
                    Sign Up
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>

                        <Field
                            as={TextField}
                            placeholder="Email"
                            name="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="email"
                            autoComplete="off"
                        />
                        <ErrorMessage name="email">
                            {(msg) => (
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <ErrorOutline color="error" sx={{ mr: 1 }} />
                                    <FormHelperText sx={{ color: "red", }}>{msg}</FormHelperText>
                                </Box>
                            )}
                        </ErrorMessage>
                        <Field
                            as={TextField}
                            placeholder="Password"
                            name="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="password"
                            autoComplete="off"
                        />
                        <ErrorMessage name="password">
                            {(msg) => (
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <ErrorOutline color="error" sx={{ mr: 1 }} />
                                    <FormHelperText sx={{ color: "red", }}>{msg}</FormHelperText>
                                </Box>
                            )}
                        </ErrorMessage>
                        <Button

                            type="submit"
                            fullWidth
                            variant='outlined'
                            sx={{
                                mt: 2,
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
                            }}>
                            Sign Up
                        </Button>
                    </Form>
                </Formik>
                <Typography variant="body2" align="center" mt={2}>
                    Already have an account? <Link href="/login">Login</Link>
                </Typography>
            </Container>
        </Box>
    );
};

export default Signup;
