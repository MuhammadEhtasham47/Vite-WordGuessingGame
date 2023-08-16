import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useSelector } from 'react-redux';

const lettersArray1 = [
    { key: "q" }, { key: "w" }, { key: "e" }, { key: "r" }, { key: "t" }, { key: "y" },
    { key: "u" }, { key: "i" }, { key: "o" }, { key: "p" },
];
const lettersArray2 = [
    { key: "a" }, { key: "s" }, { key: "d" }, { key: "f" }, { key: "g" }, { key: "h" },
    { key: "j" }, { key: "k" }, { key: "l" }
];

const lettersArray3 = [
    { key: "z" }, { key: "x" }, { key: "c" }, { key: "v" }, { key: "b" },
    { key: "n" }, { key: "m" },
];

export default function Keypad({ usedKeys, handleKeyup, currentGuess }) {
    const themeMode = useSelector((state) => state.theme.themeMode)

    const [guessLength, setGuessLength] = useState(0)

    useEffect(() => {
        let guessArray = currentGuess.split('')
        let guessArrayLength = guessArray.length
        setGuessLength(guessArrayLength)
    }, [currentGuess])

    return (

        <Box sx={{ padding: { xs550: '23px 22.5px' }, backgroundColor: themeMode === 'dark' ? 'rgba(218, 220, 224, 0.03)' : '#FFF', borderRadius: '15px', marginTop: '24px', marginBottom: '50px', width: { xs: '100%', sm: '638px' } }}>
            <Box className='keypad' sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: '2px' }}>
                {
                    lettersArray1 && lettersArray1.map(l => {
                        const color = usedKeys[l.key]
                        return (
                            <Button sx={{ minWidth: { xs: `calc(100% / ${lettersArray1.length + 1})`, xs550: `calc(100% / ${lettersArray1.length})` }, background: themeMode === 'dark' ? '#565F7E' : '#D3D6DA', color: themeMode === 'dark' ? '#FFF' : '#56575E' }} onClick={() => { handleKeyup({ key: l.key }) }} key={l.key} className={(color === 'grey' && themeMode === 'dark') ? `dark${color}` : color}>{l.key}</Button>
                        )
                    })
                }
            </Box >

            <Box className='keypad' sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: '2px' }}>
                {
                    lettersArray2 && lettersArray2.map(l => {
                        const color = usedKeys[l.key]
                        return (
                            <Button sx={{ minWidth: { xs: `calc(100% / ${lettersArray1.length})`, xs550: `calc(100% / ${lettersArray1.length - 0.5})` }, background: themeMode === 'dark' ? '#565F7E' : '#D3D6DA', color: themeMode === 'dark' ? '#FFF' : '#56575E' }} onClick={() => { handleKeyup({ key: l.key }) }} key={l.key} className={(color === 'grey' && themeMode === 'dark') ? `dark${color}` : color}>{l.key}</Button>
                        )
                    })
                }
            </Box>


            <Box className='keypad' sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: '2px' }}>
                <Button sx={{ minWidth: { xs: `calc(100% / ${lettersArray3.length + 3})`, xs550: `calc(100% / ${lettersArray3.length + 2})` }, background: themeMode === 'dark' ? '#565F7E' : '#D3D6DA', color: themeMode === 'dark' ? '#FFF' : '#56575E' }} disabled={guessLength !== 5 ? true : false} onClick={() => { handleKeyup({ key: 'Enter' }) }}  ><KeyboardReturnIcon sx={{ fontSize: { xs: '18px', xs350px: '24x', xs450: '24px', sm: '24px' } }} /></Button>
                {
                    lettersArray3 && lettersArray3.map(l => {
                        const color = usedKeys[l.key]
                        return (
                            <Button sx={{ minWidth: { xs: `calc(100% / ${lettersArray3.length + 3})`, xs550: `calc(100% / ${lettersArray3.length + 2})` }, background: themeMode === 'dark' ? '#565F7E' : '#D3D6DA', color: themeMode === 'dark' ? '#FFF' : '#56575E' }} onClick={() => { handleKeyup({ key: l.key }) }} key={l.key} className={(color === 'grey' && themeMode === 'dark') ? `dark${color}` : color}>{l.key}</Button>
                        )
                    })
                }
                < Button sx={{ minWidth: { xs: `calc(100% / ${lettersArray3.length + 3})`, xs550: `calc(100% / ${lettersArray3.length + 2})` }, background: themeMode === 'dark' ? '#565F7E' : '#D3D6DA', color: themeMode === 'dark' ? '#FFF' : '#56575E' }} onClick={() => { handleKeyup({ key: 'Backspace' }) }}  ><BackspaceOutlinedIcon sx={{ fontSize: { xs: '18px', xs350px: '24x', xs450: '24px', sm: '24px' } }} /></Button>
            </Box >
        </Box >
    )
}
