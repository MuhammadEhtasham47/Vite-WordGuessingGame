import { Cancel, CheckCircleOutline, MoodBadOutlined } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeShowModal, setWordsGuessed } from '../redux/userSlice'

export default function ModalDetails({ handleReset }) {

    const themeMode = useSelector((state) => state.theme.themeMode)
    const wordsGuessed = useSelector((state) => state.user.wordsGuessed)

    console.log('wordsGussed', wordsGuessed);
    const dispatch = useDispatch()
    return (
        <div style={{ borderRadius: '8px', width: '320px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

            {wordsGuessed === 20 ? (
                <div>
                    <CheckCircleOutline sx={{ fontSize: 60, color: '#4caf50' }} />
                    <Typography variant="h5" sx={{ marginBottom: '8px' }}>
                        Congratulations! You Win!
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: '8px', color: themeMode === 'light' ? "#202537" : '#FFF', }}>
                        You've successfully found the all the solutions for today! 🎉
                    </Typography>
                </div>
            )
                : wordsGuessed === 0 ? (
                    <div>
                        <Cancel sx={{ fontSize: 60, color: '#f44336' }} />
                        <Typography variant="h5" sx={{ marginBottom: '8px' }}>
                            Game Overs!
                        </Typography>
                        <Typography variant="h5" sx={{ marginBottom: '8px' }}>
                            Better Luck Next Time.
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: '8px', color: themeMode === 'light' ? "#202537" : '#FFF', }}>
                            Unfortunately, you couldn't find the solution this time. Keep trying! 😞
                        </Typography>
                    </div>
                )
                    : (
                        <div>
                            <MoodBadOutlined sx={{ fontSize: 60, color: '#ff9800' }} />
                            <Typography variant="h5" sx={{ marginBottom: '8px' }}>
                                Nice Try, But Not Quite There.
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '8px', color: themeMode === 'light' ? "#202537" : '#FFF', }}>
                                You've made some progress, but couldn't guess the solution yet. Don't give up! 😊
                            </Typography>
                        </div>
                    )}
            <Button
                variant="outlined"
                onClick={() => { dispatch(setWordsGuessed(0)); handleReset(); dispatch(closeShowModal()) }}
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
                Close
            </Button>
        </div >
    )
}
