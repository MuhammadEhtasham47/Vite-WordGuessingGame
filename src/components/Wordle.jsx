import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid.jsx'
import Keypad from './Keypad.jsx'
import ModalDetails from './ModalDetails.jsx'
import Topbar from './Topbar.jsx'
import { Box, Modal, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import Settings from './Settings'
import Help from './Help'
import { Stats } from './Stats'
import moment from 'moment/moment'
import { resetTime } from '../redux/timeSlice'
import { closeShowModal, setResetCount, setWordsGuessed } from '../redux/userSlice'


const MainContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    padding: '20px 0px 0px 0px'
}));

export default function Wordle() {
    const dispatch = useDispatch()
    const firstInput = useSelector((state) => state.time.firstInput)
    const wordsGuessed = useSelector((state) => state.user.wordsGuessed)
    const shouldSettingsOpen = useSelector((state) => state.user.shouldSettingsOpen)
    const shouldHelpOpen = useSelector((state) => state.user.shouldHelpOpen)
    const shouldStatsOpen = useSelector((state) => state.user.shouldStatsOpen)
    const themeMode = useSelector((state) => state.theme.themeMode)
    const showModal = useSelector((state) => state.user.showModal)
    const words = useSelector((state) => state.user.words)

    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    let solution = words[wordsGuessed]
    const { currentGuess, guesses, turn, usedKeys, handleKeyup, incorrectGuess, handleReset } = useWordle(solution)

    const handleResize = () => {
        setInnerWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (innerWidth > 768) {
            window.addEventListener('keyup', handleKeyup);
            return () => {
                window.removeEventListener('keyup', handleKeyup);
            };
        }
    }, [handleKeyup, innerWidth]);

    useEffect(() => {

        const firstInputDate = moment(firstInput).format('DD');
        const currentDate = moment(new Date()).format('DD');
        if (parseInt(firstInputDate) !== parseInt(currentDate)) {
            dispatch(resetTime());
            dispatch(setResetCount())
            dispatch(setWordsGuessed(0));
            dispatch(closeShowModal());
        }
    }, [])


    return (

        <MainContainer >
            <Topbar />

            {
                shouldSettingsOpen && <Settings />
            }

            {
                shouldHelpOpen && <Help />
            }

            {
                shouldStatsOpen && <Stats />
            }

            {
                (shouldHelpOpen === false && shouldSettingsOpen === false && shouldStatsOpen === false) &&
                <>
                    <Box
                        sx={{
                            width: { xs: '100%', xs350: '100%', xs450: '100%', sm: '638px' },
                            marginTop: '-70px',
                            marginBottom: '50px',
                            display: "flex",
                            justifyContent: 'space-between',
                            padding: "0px 20px"

                        }}
                    >
                        <Typography sx={{ fontSize: { xs: '11px', xs350: '15px', xs450: '17px' }, color: themeMode === 'light' ? "#202537" : '#FFF', }}>   Remaining Guesses: {6 - incorrectGuess}  </Typography>
                        <Typography sx={{ fontSize: { xs: '11px', xs350: '15px', xs450: '17px' }, color: themeMode === 'light' ? "#202537" : '#FFF', }}>  Words Guessed : {wordsGuessed} / 20 </Typography>
                    </Box>
                    <Grid handleKeyup={handleKeyup} guesses={guesses} currentGuess={currentGuess} incorrectGuess={incorrectGuess} turn={turn} />
                    <Keypad usedKeys={usedKeys} handleKeyup={handleKeyup} currentGuess={currentGuess} />
                </>
            }




            <Modal
                open={showModal}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    background: themeMode === 'light' ? '#F3F3F3' : '#13151e',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    outline: 'none',
                    '&:focus': { outline: 'none' },
                }}
                >
                    <ModalDetails handleReset={handleReset} ></ModalDetails>
                </Box>
            </Modal>


        </MainContainer >
    )
}