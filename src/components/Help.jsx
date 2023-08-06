import { Box, Typography } from '@mui/material'
import React from 'react'
import { closeHelp } from '../redux/userSlice'
import { Clear } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'

const Help = () => {

    const themeMode = useSelector((state) => state.theme.themeMode)
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
                        fontWeight: '600'
                    }}
                >
                    How to play
                </Typography>

                <Clear
                    sx={{
                        color: themeMode === 'light' ? '#818181' : '#FFF',
                        fontSize: { xs: '20px', xs350: '25px', xs450: '30px', sm: '35px' },
                        fontWeight: 500,
                        position: "absolute",
                        right: '20px',
                        cursor: 'pointer'
                    }}
                    onClick={() => { dispatch(closeHelp()) }}
                />
            </Box>

            <Box sx={{ width: { xs: '100%', sm: '638px' }, display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: 'center', gap: '20px', padding: '10px 20px ' }}>
                <Typography
                    sx={{
                        color: themeMode === 'light' ? "#202537" : '#FFF',
                        fontSize: { xs: '14px', xs350: '15px', xs450: '17px' },
                    }}
                >
                    You have to guess the hidden word in 6 tries and the color of the letters changes to show how close you are.
                </Typography>

                <Typography
                    sx={{
                        color: themeMode === 'light' ? "#202537" : '#FFF',
                        fontSize: { xs: '14px', xs350: '15px', xs450: '17px' },
                    }}
                >
                    To start the game, just enter any word, for example:
                </Typography>

                <Box sx={{ display: "flex", gap: "10px", }}>
                    <Box sx={{ width: { xs: '50px', sm: '65px' }, height: { xs: "50px", sm: '65px' }, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#939B9F', fontSize: { xs: '30px', sm: '40px' }, fontWeight: "bold", color: 'white' }}>T</Box>
                    <Box sx={{ width: { xs: '50px', sm: '65px' }, height: { xs: "50px", sm: '65px' }, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#CEB02C', fontSize: { xs: '30px', sm: '40px' }, fontWeight: "bold", color: 'white' }} >A</Box>
                    <Box sx={{ width: { xs: '50px', sm: '65px' }, height: { xs: "50px", sm: '65px' }, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#939B9F', fontSize: { xs: '30px', sm: '40px' }, fontWeight: "bold", color: 'white' }}>B</Box>
                    <Box sx={{ width: { xs: '50px', sm: '65px' }, height: { xs: "50px", sm: '65px' }, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#CEB02C', fontSize: { xs: '30px', sm: '40px' }, fontWeight: "bold", color: 'white' }} >L</Box>
                    <Box sx={{ width: { xs: '50px', sm: '65px' }, height: { xs: "50px", sm: '65px' }, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#6AAA64', fontSize: { xs: '30px', sm: '40px' }, fontWeight: "bold", color: 'white' }}>E</Box>
                </Box>

                <Box
                    sx={{
                        width: { xs: '100%', xs350: '100%', xs450: '100%', sm: '638px' },
                        background: themeMode === 'light' ? '#F3F3F3' : 'rgba(218, 220, 224, 0.03)',
                        height: '200px',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: "30px",
                        padding: '15px',
                    }}
                >

                    <Box display='flex' alignItems='center' gap='5px'>
                        <Box sx={{ width: { xs: '25px', sm: '35px' }, height: { xs: "25px", sm: '35px' }, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#939B9F', fontSize: { xs: '16px', sm: '24px' }, fontWeight: "bold", color: 'white' }}>T</Box>
                        <span> , </span>
                        <Box sx={{ width: { xs: '25px', sm: '35px' }, height: { xs: "25px", sm: '35px' }, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#939B9F', fontSize: { xs: '16px', sm: '24px' }, fontWeight: "bold", color: 'white' }}>B</Box>
                        <Typography
                            sx={{
                                color: themeMode === 'light' ? "#202537" : '#FFF',
                                fontSize: { xs: '12px', xs350: '13px', xs450: '17px' },
                            }}
                        >
                            aren't in the target word at all.
                        </Typography>
                    </Box>

                    <Box display='flex' alignItems='center' gap='5px'>
                        <Box sx={{ width: { xs: '25px', sm: '35px' }, height: { xs: "25px", sm: '35px' }, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#CEB02C', fontSize: { xs: '16px', sm: '24px' }, fontWeight: "bold", color: 'white' }}>A</Box>
                        <span>,</span>
                        <Box sx={{ width: { xs: '25px', sm: '35px' }, height: { xs: "25px", sm: '35px' }, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#CEB02C', fontSize: { xs: '16px', sm: '24px' }, fontWeight: "bold", color: 'white' }}>L</Box>
                        <Typography
                            sx={{
                                color: themeMode === 'light' ? "#202537" : '#FFF',
                                fontSize: { xs: '11px', xs350: '13px', xs450: '17px' },
                            }}
                        >
                            is in the word but in the wrong spot.
                        </Typography>
                    </Box>

                    <Box display='flex' alignItems='center' gap='5px'>
                        <Box sx={{ width: { xs: '25px', sm: '35px' }, height: { xs: "25px", sm: '35px' }, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#6AAA64', fontSize: { xs: '16px', sm: '24px' }, fontWeight: "bold", color: 'white' }}>E</Box>
                        <Typography
                            sx={{
                                color: themeMode === 'light' ? "#202537" : '#FFF',
                                fontSize: { xs: '12px', xs350: '13px', xs450: '17px' },
                            }}
                        >
                            is in the word and in the correct spot.
                        </Typography>
                    </Box>




                </Box>

                <Box sx={{ display: "flex", gap: "10px" }}>
                    <Box sx={{ width: { xs: '50px', sm: '65px' }, height: { xs: "50px", sm: '65px' }, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#6AAA64', fontSize: { xs: '30px', sm: '40px' }, fontWeight: "bold", color: 'white' }}>T</Box>
                    <Box sx={{ width: { xs: '50px', sm: '65px' }, height: { xs: "50px", sm: '65px' }, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#6AAA64', fontSize: { xs: '30px', sm: '40px' }, fontWeight: "bold", color: 'white' }} >A</Box>
                    <Box sx={{ width: { xs: '50px', sm: '65px' }, height: { xs: "50px", sm: '65px' }, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#6AAA64', fontSize: { xs: '30px', sm: '40px' }, fontWeight: "bold", color: 'white' }}>B</Box>
                    <Box sx={{ width: { xs: '50px', sm: '65px' }, height: { xs: "50px", sm: '65px' }, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#939B9F', fontSize: { xs: '30px', sm: '40px' }, fontWeight: "bold", color: 'white' }} >L</Box>
                    <Box sx={{ width: { xs: '50px', sm: '65px' }, height: { xs: "50px", sm: '65px' }, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#939B9F', fontSize: { xs: '30px', sm: '40px' }, fontWeight: "bold", color: 'white' }}>E</Box>
                </Box>

                <Typography
                    sx={{
                        color: themeMode === 'light' ? "#202537" : '#FFF',
                        fontSize: { xs: '14px', xs350: '15px', xs450: '17px' },
                    }}
                >
                    So close!
                </Typography>

                <Box sx={{ display: "flex", gap: "10px" }}>
                    <Box sx={{ width: { xs: '50px', sm: '65px' }, height: { xs: "50px", sm: '65px' }, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#6AAA64', fontSize: { xs: '30px', sm: '40px' }, fontWeight: "bold", color: 'white' }}>T</Box>
                    <Box sx={{ width: { xs: '50px', sm: '65px' }, height: { xs: "50px", sm: '65px' }, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#6AAA64', fontSize: { xs: '30px', sm: '40px' }, fontWeight: "bold", color: 'white' }} >A</Box>
                    <Box sx={{ width: { xs: '50px', sm: '65px' }, height: { xs: "50px", sm: '65px' }, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#6AAA64', fontSize: { xs: '30px', sm: '40px' }, fontWeight: "bold", color: 'white' }}>B</Box>
                    <Box sx={{ width: { xs: '50px', sm: '65px' }, height: { xs: "50px", sm: '65px' }, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#6AAA64', fontSize: { xs: '30px', sm: '40px' }, fontWeight: "bold", color: 'white' }} >L</Box>
                    <Box sx={{ width: { xs: '50px', sm: '65px' }, height: { xs: "50px", sm: '70px' }, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#6AAA64', fontSize: { xs: '30px', sm: '40px' }, fontWeight: "bold", color: 'white' }}>E</Box>
                </Box>

                <Typography
                    sx={{
                        color: themeMode === 'light' ? "#202537" : '#FFF',
                        fontSize: { xs: '14px', xs350: '15px', xs450: '17px' },
                    }}
                >
                    Got it! 🏆
                </Typography>
            </Box >

        </>
    )
}


export default Help