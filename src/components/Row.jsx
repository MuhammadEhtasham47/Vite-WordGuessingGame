import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCorrectWordCount, setInCorrectGuessCount } from '../redux/userSlice'

export default function Row({ guess, currentGuess, incorrectGuess }) {
    const themeMode = useSelector((state) => state.theme.themeMode)
    const wordsGuessed = useSelector((state) => state.user.wordsGuessed)
    const correctWordsCount = useSelector((state) => state.user.correctWordsCount)
    const incorrectGuessCount = useSelector((state) => state.user.incorrectGuessCount)

    const dispatch = useDispatch()


    useEffect(() => {
        if (guess !== undefined) {
            const allColorsAreGreen = guess.every(l => l.color === 'green');
            const keys = guess.map(l => l.key);
            const joinedKeys = keys.join('');

            if (allColorsAreGreen) {
                dispatch(setCorrectWordCount({ joinedKeys, wordsGuessed }));
                dispatch(setInCorrectGuessCount({ joinedKeys, incorrectGuess }));
            }
            else {
                dispatch(setInCorrectGuessCount({ joinedKeys, incorrectGuess }));
                dispatch(setCorrectWordCount({ joinedKeys, wordsGuessed }));

            }
        }
    }, [guess]);

    if (guess) {

        const allColorsAreGreen = guess.every(l => l.color === 'green');
        const keys = guess.map(l => l.key);
        const joinedKeys = keys.join('');

        return (
            <Box
                sx={{
                    width: { xs: '100%', xs350: '100%', xs450: '100%', sm: '638px' },
                    display: "flex",
                    justifyContent: 'space-between',
                    alignItems: 'center',

                }}
            >
                <Typography sx={{ fontSize: { xs: '0px', xs320: '6px', xs450: '8px', xs550: '9px', sm: '10px', zIndex: 9999 }, color: themeMode === 'light' ? "#202537" : '#FFF' }}>
                    {`Guesses Left: ${incorrectGuessCount[joinedKeys] ? (6 - incorrectGuessCount[joinedKeys]) : 6}`}
                </Typography>

                <div className="row past" style={{ marginLeft: '12px' }}>
                    {guess.map((l, i) => (
                        <div key={i} className={allColorsAreGreen ? 'correct' : l.color}>{l.key}</div>
                    ))}
                </div>
                <Typography sx={{ fontSize: { xs: '0px', xs320: '6px', xs450: '8px', xs550: '9px', sm: '10px' }, color: themeMode === 'light' ? "#202537" : '#FFF' }}>
                    {`Words Guessed : ${correctWordsCount[joinedKeys]}`}
                </Typography>

            </Box>

        )
    }

    if (currentGuess) {
        let letters = currentGuess.split('')

        return (
            <div className="row current">
                {letters.map((letter, i) => (
                    <div style={{ color: themeMode === 'light' ? '#56575E' : '#FFF' }} key={i} className="filled">{letter}</div>
                ))}
                {[...Array(5 - letters.length)].map((_, i) => (
                    <div key={i}></div>
                ))}
            </div>

        )
    }

    return (
        <Box className="row" sx={{ marginLeft: { xs320: '2px', sm: '-5px' } }}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </Box>
    )

}