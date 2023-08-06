import { Clear } from '@mui/icons-material'
import { Box, Switch, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { animateFalse, animateTrue, closeSettings } from '../redux/userSlice'
import styled from '@emotion/styled'
import { makeThemeDark, makeThemeLight } from '../redux/themeSlice'

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 48,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(22px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const Settings = () => {
    const themeMode = useSelector((state) => state.theme.themeMode)
    const animation = useSelector((state) => state.user.animation)
    const dispatch = useDispatch()
    return (
        <>

            <Box
                sx={{
                    width: { xs: '100%', xs350: '100%', xs450: '100%', sm: '638px' },
                    background: themeMode === 'light' ? '#F3F3F3' : 'rgba(218, 220, 224, 0.03)',
                    height: '40px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    marginTop: '-80px'
                }}
            >
                <Typography
                    sx={{
                        color: themeMode === 'light' ? "#202537" : '#FFF',
                        fontSize: { xs: '20px', xs350: '25px' },
                    }}
                >
                    Settings
                </Typography>

                <Clear
                    sx={{
                        color: themeMode === 'light' ? '#818181' : '#FFF',
                        fontSize: { xs: '20px', xs350: '25px', xs450: '30px', sm: '35px' },
                        fontWeight: 500,
                        position: "absolute",
                        right: '20px',
                        cursor: "pointer"

                    }}
                    onClick={() => { dispatch(closeSettings()) }}
                />
            </Box>

            <Box
                sx={{
                    width: { xs: '100%', sm: '638px' },
                }}
            >

                {/* Dark Mode*/}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'end',
                        mb: '10px',
                        padding: '0px 10px',

                    }}
                >
                    <Box sx={{
                        mt: "10px",
                        width: '90%',
                        display: 'flex',
                        flexDirection: "column",
                        alignItems: 'flex-start',
                    }}>
                        <Typography
                            sx={{
                                color: themeMode === 'light' ? "#202537" : '#FFF',
                                fontSize: { xs: '18px', xs350: '19px', xs450: '22px', sm: '25px' },
                                fontWeight: "600"
                            }}
                        >
                            Dark Mode
                        </Typography>
                        <Typography
                            sx={{
                                color: themeMode === 'light' ? "#202537" : '#FFF',
                                fontSize: { xs: '16px', xs350: '17px', xs450: '19px', sm: '22px' },

                            }}
                        >
                            Change dark and light mode
                        </Typography>
                    </Box>


                    <IOSSwitch checked={themeMode === 'light' ? false : true} sx={{ marginBottom: '4px' }}
                        onChange={({ target: { checked } }) => {
                            if (checked) {
                                dispatch(makeThemeDark())

                            } else {
                                dispatch(makeThemeLight())
                            }
                        }}
                    />
                </Box>

                <div style={{ width: '100%', height: '2px', background: themeMode === 'light' ? '#F3F3F3' : 'rgba(218, 220, 224, 0.03)', }} />


                {/* Animation*/}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'end',
                        mb: '10px',
                        padding: '0px 10px',

                    }}
                >
                    <Box sx={{
                        mt: "10px",
                        width: '90%',
                        display: 'flex',
                        flexDirection: "column",
                        alignItems: 'flex-start',
                    }}>
                        <Typography
                            sx={{
                                color: themeMode === 'light' ? "#202537" : '#FFF',
                                fontSize: { xs: '18px', xs350: '19px', xs450: '22px', sm: '25px' },
                                fontWeight: "600"
                            }}
                        >
                            Confetti Animation
                        </Typography>
                        <Typography
                            sx={{
                                color: themeMode === 'light' ? "#202537" : '#FFF',
                                fontSize: { xs: '15px', xs350: '16.5px', xs450: '19px', sm: '22px' },
                                width: '90%',
                                textAlign: 'left',
                                lineHeight: '20px',
                            }}
                        >
                            Confetti Animation when the game is on
                        </Typography>
                    </Box>


                    <IOSSwitch checked={animation} sx={{ marginBottom: '4px' }}
                        onChange={({ target: { checked } }) => {
                            if (checked) {
                                dispatch(animateTrue())

                            } else {
                                dispatch(animateFalse())
                            }
                        }}
                    />
                </Box>

            </Box>

        </>
    )
}

export default Settings