import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid.jsx'
import Keypad from './Keypad.jsx'
import ModalDetails from './ModalDetails.jsx'
import Topbar from './Topbar.jsx'
import { Box, Modal, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import Settings from './Settings'
import Help from './Help'
import { Stats } from './Stats'


const MainContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    padding: '20px 0px 0px 0px'
}));

export default function Wordle() {

    const wordsGuessed = useSelector((state) => state.user.wordsGuessed)
    const shouldSettingsOpen = useSelector((state) => state.user.shouldSettingsOpen)
    const shouldHelpOpen = useSelector((state) => state.user.shouldHelpOpen)
    const shouldStatsOpen = useSelector((state) => state.user.shouldStatsOpen)
    const themeMode = useSelector((state) => state.theme.themeMode)
    const showModal = useSelector((state) => state.user.showModal)


    const words = useSelector((state) => state.user.words)
    // const dispatch = useDispatch()

    let solution = words[wordsGuessed]
    const { currentGuess, guesses, turn, usedKeys, handleKeyup, incorrectGuess, handleReset } = useWordle(solution)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup);
        return () => {
            window.removeEventListener('keyup', handleKeyup);
        };
    }, [handleKeyup]);

    useEffect(() => {
        guesses.forEach(guess => {
            console.log('guess', guess);
        })
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
                            // background: themeMode === 'light' ? '#F3F3F3' : 'rgba(218, 220, 224, 0.03)',
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
            // sx={{
            //     border: '0px solid black',
            //     outline: 'none', // Remove focus outline from the modal container
            //     '&:focus': { outline: 'none' },
            // }}
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
                    outline: 'none', // Remove focus outline from the modal container
                    '&:focus': { outline: 'none' },
                }}
                //  style={{ background: themeMode === 'light' ? '#F3F3F3' : 'rgba(218, 220, 224, 0.03)' }}
                >
                    <ModalDetails handleReset={handleReset} ></ModalDetails>
                </Box>
            </Modal>


        </MainContainer >
    )
}