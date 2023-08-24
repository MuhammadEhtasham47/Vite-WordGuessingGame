import { Cancel, CheckCircleOutline, HighlightOffOutlined, MoodBadOutlined } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeShowModal, setWordsGuessed } from '../redux/userSlice'
import moment from 'moment/moment'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-hot-toast'
export default function ModalDetails({ handleReset }) {
    const firstInput = useSelector((state) => state.time.firstInput)
    const endTime = useSelector((state) => state.time.endTime)
    const themeMode = useSelector((state) => state.theme.themeMode)
    const wordsGuessed = useSelector((state) => state.user.wordsGuessed)

    const dispatch = useDispatch()


    // const calculateTime = () => {
    //     const momentFirstInput = moment(firstInput).format('HH:mm:ss');
    //     const momentNow = moment(endTime).format('HH:mm:ss');

    //     const firstInputHour = parseInt(momentFirstInput.split(':')[0]);
    //     const firstInputMinute = parseInt(momentFirstInput.split(':')[1]);
    //     const firstInputSeconds = parseInt(momentFirstInput.split(':')[2]);
    //     const momentNowHour = parseInt(momentNow.split(':')[0]);
    //     const momentNowMinute = parseInt(momentNow.split(':')[1]);
    //     const momentNowSeconds = parseInt(momentNow.split(':')[2]);

    //     let string = ''; // Initialize the string

    //     let timeDifference = momentNowSeconds - firstInputSeconds;
    //     if (timeDifference !== 1) {
    //         string += `${timeDifference}s`;
    //     }

    //     timeDifference = momentNowMinute - firstInputMinute;
    //     if (timeDifference === 1) {
    //         string = `${timeDifference}m${string}`;
    //     }

    //     timeDifference = momentNowHour - firstInputHour;
    //     if (timeDifference !== 1) {
    //         string = `${timeDifference}h${string}`;
    //     }

    //     return string;
    // };

    const calculateTime = () => {
        const momentFirstInput = moment(firstInput);
        const momentNow = moment(endTime);

        const timeDifference = moment.duration(momentNow.diff(momentFirstInput));

        const hours = timeDifference.hours();
        const minutes = timeDifference.minutes();
        const seconds = timeDifference.seconds();

        let string = '';

        if (hours > 0) {
            string += `${hours}h`;
        }

        if (minutes > 0) {
            string += `${minutes}m`;
        }

        if (seconds > 0) {
            string += `${seconds}s`;
        }

        return string;
    };



    return (
        <div style={{ width: '320px', borderRadius: '8px', position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: "-15px", right: '-30px' }}> <HighlightOffOutlined sx={{ cursor: 'pointer' }} onClick={() => { dispatch(closeShowModal()) }} /></Box>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                {wordsGuessed === 20 ? (
                    <div>
                        <CheckCircleOutline sx={{ fontSize: 60, color: '#4caf50' }} />
                        <Typography variant="h5" sx={{ marginBottom: '8px' }}>
                            Congratulations! You Win!
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: '8px', color: themeMode === 'light' ? "#202537" : '#FFF', }}>
                            You guessed 20 words in {calculateTime()}
                        </Typography>
                    </div>
                )
                    : wordsGuessed === 0 ? (
                        <div>
                            <Cancel sx={{ fontSize: 60, color: '#f44336' }} />
                            <Typography variant="h5" sx={{ marginBottom: '8px' }}>
                                Game Overs!
                            </Typography>
                            {/* <Typography variant="h5" sx={{ marginBottom: '8px' }}>
                            Better Luck Next Time.
                        </Typography> */}
                            <Typography variant="body1" sx={{ marginBottom: '8px', color: themeMode === 'light' ? "#202537" : '#FFF', }}>
                                You guessed {wordsGuessed} words in {calculateTime()}
                            </Typography>
                        </div>
                    )
                        : (
                            <div>
                                <MoodBadOutlined sx={{ fontSize: 60, color: '#ff9800' }} />
                                <Typography variant="h5" sx={{ marginBottom: '8px', fontSize: '23px' }}>
                                    Nice Try, But Not Quite There.
                                </Typography>
                                <Typography variant="body1" sx={{ marginBottom: '8px', color: themeMode === 'light' ? "#202537" : '#FFF', }}>
                                    You guessed {wordsGuessed} {wordsGuessed === 1 ? 'word' : 'words'} in {calculateTime()}.
                                </Typography>
                            </div>
                        )}
                <CopyToClipboard text={`Foreverdle #3\n${wordsGuessed}/20 words solved in ${calculateTime()}\nhttps://foreverdle.com\n#foreverdle`}>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            toast.success('Copied to clipboard')
                        }}
                        sx={{
                            mt: '20px',
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
                        Share
                    </Button>
                </CopyToClipboard>
            </div >
        </div>
    )
}
