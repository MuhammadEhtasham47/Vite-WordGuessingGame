import { Clear } from '@mui/icons-material'
import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { closeStats, setBestTry, setCurrentStreak, setGamesPlayed, setGamesWon, setMaxStreak, setWinPercentage } from '../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { privateRequest } from '../apiRequests'

export const Stats = () => {
    const themeMode = useSelector((state) => state.theme.themeMode)
    const currentStreak = useSelector((state) => state.user.currentStreak)
    const maxStreak = useSelector((state) => state.user.maxStreak)
    const bestTry = useSelector((state) => state.user.bestTry)
    const gamesWon = useSelector((state) => state.user.gamesWon)
    const gamesPlayed = useSelector((state) => state.user.gamesPlayed)
    const winPercentage = useSelector((state) => state.user.winPercentage)
    const userToken = useSelector((state) => state.auth.userToken)

    const dispatch = useDispatch()

    const [userData, setUserData] = useState({
        currentStreak: currentStreak,
        maxStreak: maxStreak,
        bestTry: bestTry,
        gamesWon: gamesWon,
        gamesPlayed: gamesPlayed,
        winPercentage: winPercentage,
    })


    const fetchStats = () => {
        privateRequest.get('stats/view-stats')
            .then((response) => {
                let tempObj = {
                    currentStreak: response.currentStreak,
                    maxStreak: response.maxStreak,
                    bestTry: response.bestTry,
                    gamesWon: response.gamesWon,
                    gamesPlayed: response.gamesPlayed,
                    winPercentage: response.percentageOfWin,
                }
                setUserData(tempObj)
            })
    }

    const handleSetStats = () => {
        let apiObject = {
            "gamesPlayed": `${gamesPlayed}`,
            "gamesWon": `${gamesWon}`,
            "percentageOfWin": `${winPercentage}`,
            "bestTry": `${bestTry}`,
            "currentStreak": `${currentStreak}`,
            "maxStreak": `${maxStreak}`
        }
        privateRequest.put('stats/update-stats', apiObject)
            .then(() => {
                console.log('api data saved');
            })
            .catch(() => {
                console.log('api failed')
            })
    }

    const handleResetStats = () => {
        dispatch(setWinPercentage(0));
        dispatch(setGamesPlayed(0));
        dispatch(setGamesWon(0));
        dispatch(setCurrentStreak(0));
        dispatch(setMaxStreak(0));
        dispatch(setBestTry(0));
        setUserData({
            currentStreak: 0,
            maxStreak: 0,
            bestTry: 0,
            gamesWon: 0,
            gamesPlayed: 0,
            winPercentage: 0,
        })
    }


    useEffect(() => {
        if (userToken !== null) {
            fetchStats()
        }
    }, [])



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
                    Statistics
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
                    onClick={() => { dispatch(closeStats()) }}
                />
            </Box>

            <Grid container spacing={2} sx={{ width: { xs: '100%', xs350: '100%', xs450: '100%', sm: '638px' }, justifyContent: 'center', mt: '20px' }}>
                <Grid item xs={4} xs450={3.8} sm={3.8}>
                    <Box sx={{ padding: '20px 10px', width: '100%', height: '100px', backgroundColor: "red", borderRadius: '12px', background: themeMode === 'light' ? '#F3F3F3' : 'rgba(218, 220, 224, 0.03)', display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center', }}>
                        <Typography sx={{ fontSize: { xs: '24px', xs350: '29px', xs450: '33px', sm: '40px' }, fontWeight: "bold", color: themeMode === 'light' ? "#202537" : '#FFF', }}>{userData.gamesPlayed}</Typography>
                        <Typography sx={{ fontSize: { xs: '10px', xs350: '12px', xs450: '13px', sm: '16px' }, color: themeMode === 'light' ? "#202537" : '#FFF', }}>🕹️ Games played</Typography>

                    </Box>
                </Grid>

                <Grid item xs={4} xs450={3.8} sm={3.8}>
                    <Box sx={{ padding: '20px 10px', width: '100%', height: '100px', backgroundColor: "red", borderRadius: '12px', background: themeMode === 'light' ? '#F3F3F3' : 'rgba(218, 220, 224, 0.03)', display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center', }}>
                        <Typography sx={{ fontSize: { xs: '24px', xs350: '29px', xs450: '33px', sm: '40px' }, fontWeight: "bold", color: themeMode === 'light' ? "#202537" : '#FFF', }}>{userData.gamesWon}</Typography>
                        <Typography sx={{ fontSize: { xs: '10px', xs350: '12px', xs450: '13px', sm: '16px' }, color: themeMode === 'light' ? "#202537" : '#FFF', }}>🏆 Games Won</Typography>

                    </Box>
                </Grid>

                <Grid item xs={4} xs450={3.8} sm={3.8}>
                    <Box sx={{ padding: '20px 10px', width: '100%', height: '100px', backgroundColor: "red", borderRadius: '12px', background: themeMode === 'light' ? '#F3F3F3' : 'rgba(218, 220, 224, 0.03)', display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center', }}>
                        <Typography sx={{ fontSize: { xs: '24px', xs350: '29px', xs450: '33px', sm: '40px' }, fontWeight: "bold", color: themeMode === 'light' ? "#202537" : '#FFF', }}>{userData.winPercentage}</Typography>
                        <Typography sx={{ fontSize: { xs: '10px', xs350: '12px', xs450: '13px', sm: '16px' }, color: themeMode === 'light' ? "#202537" : '#FFF', }}>📈 % of wins</Typography>

                    </Box>
                </Grid>

                <Grid item xs={4} xs450={3.8} sm={3.8}>
                    <Box sx={{ padding: '20px 10px', width: '100%', height: '100px', backgroundColor: "red", borderRadius: '12px', background: themeMode === 'light' ? '#F3F3F3' : 'rgba(218, 220, 224, 0.03)', display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center', }}>
                        <Typography sx={{ fontSize: { xs: '24px', xs350: '29px', xs450: '33px', sm: '40px' }, fontWeight: "bold", color: themeMode === 'light' ? "#202537" : '#FFF', }}>{userData.bestTry}</Typography>
                        <Typography sx={{ fontSize: { xs: '10px', xs350: '12px', xs450: '13px', sm: '16px' }, color: themeMode === 'light' ? "#202537" : '#FFF', }}>💎 Best try</Typography>

                    </Box>
                </Grid>

                <Grid item xs={4} xs450={3.8} sm={3.8}>
                    <Box sx={{ padding: '20px 10px', width: '100%', height: '100px', backgroundColor: "red", borderRadius: '12px', background: themeMode === 'light' ? '#F3F3F3' : 'rgba(218, 220, 224, 0.03)', display: 'flex', flexDirection: "column", lignItems: 'center', justifyContent: 'center', }}>
                        <Typography sx={{ fontSize: { xs: '24px', xs350: '29px', xs450: '33px', sm: '40px' }, fontWeight: "bold", color: themeMode === 'light' ? "#202537" : '#FFF', }}>{userData.currentStreak}</Typography>
                        <Typography sx={{ fontSize: { xs: '10px', xs350: '12px', xs450: '13px', sm: '16px' }, color: themeMode === 'light' ? "#202537" : '#FFF', }}>🔥 Current streak</Typography>

                    </Box>
                </Grid>

                <Grid item xs={4} xs450={3.8} sm={3.8}>
                    <Box sx={{ padding: '20px 10px', width: '100%', height: '100px', backgroundColor: "red", borderRadius: '12px', background: themeMode === 'light' ? '#F3F3F3' : 'rgba(218, 220, 224, 0.03)', display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center', }}>
                        <Typography sx={{ fontSize: { xs: '24px', xs350: '29px', xs450: '33px', sm: '40px' }, fontWeight: "bold", color: themeMode === 'light' ? "#202537" : '#FFF', }}>{userData.maxStreak}</Typography>
                        <Typography sx={{ fontSize: { xs: '10px', xs350: '12px', xs450: '13px', sm: '16px' }, color: themeMode === 'light' ? "#202537" : '#FFF', }}>⚡ Max streak</Typography>

                    </Box>
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', gap: "10px" }}>
                <Button
                    variant='outlined'
                    onClick={() => {
                        handleResetStats().then(() => {
                            handleSetStats()
                        })
                    }}
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
                    }}>
                    Reset Stats
                </Button>

                <Button
                    variant='outlined'
                    component={Link} to="/signup"
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
                    }}>
                    Signup
                </Button>

                <Button
                    variant='outlined'
                    component={Link} to="/login"
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
                    }}>
                    Login
                </Button>

            </Box>
        </>
    )
}
