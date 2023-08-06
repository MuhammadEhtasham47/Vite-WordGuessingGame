import React from "react";
import { Container, Typography, TextField, Button, Link, FormHelperText, Box } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ErrorOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { publicRequest } from "../apiRequests";
import { toast } from "react-hot-toast";
import { loginSuccess } from "../redux/authSlice";

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const handleSubmit = (values) => {
        const apiObject = {
            "password": values.password,
            "email": values.email
        }
        publicRequest.post('user/login-user', apiObject)
            .then((response) => {
                dispatch(loginSuccess(response))
                navigate('/')
            })
            .catch((error) => {
                toast.error('Email or Password Invalid')
            })
    };

    const themeMode = useSelector((state) => state.theme.themeMode)

    return (
        <Box sx={{ minHeight: "100vh", minWidth: '100vw', background: themeMode === 'light' ? '#F3F3F3' : 'rgba(218, 220, 224, 0.03)', display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: "center", }}>
            <Container maxWidth="sm" >
                <Typography variant="h4" align="center" mb={3} sx={{ color: themeMode === 'light' ? "#202537" : '#FFF', }}>
                    Login
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
                        // required
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
                        // required
                        />
                        <ErrorMessage name="password">
                            {(msg) => (
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <ErrorOutline color="error" sx={{ mr: 1 }} />
                                    <FormHelperText sx={{ color: "red", }}>{msg}</FormHelperText>
                                </Box>
                            )}
                        </ErrorMessage>

                        <Button type="submit"
                            variant='outlined'
                            fullWidth
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
                            }}
                        >
                            Login
                        </Button>
                    </Form>
                </Formik>

                <Typography variant="body2" align="center" mt={2} sx={{ color: themeMode === 'light' ? "#202537" : '#FFF', }}>
                    Don't have an account? <Link href="/signup" >Sign up</Link>
                </Typography>
            </Container>
        </Box>
    );
};

export default Login;