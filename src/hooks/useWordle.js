import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { privateRequest } from '../apiRequests'
import { openShowModal, setBestTry, setCurrentStreak, setGamesPlayed, setGamesWon, setMaxStreak, setWinPercentage, setWordsGuessed } from '../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { totalWordsArray } from '../utils/SortedWordsData'
import { firstTimeInput, gameEndTime, setGuessesForReload, setIsPlayed, setLastPlayed } from '../redux/timeSlice'
import moment from 'moment'

const useWordle = (solution) => {

    const dispatch = useDispatch()
    const firstInput = useSelector((state) => state.time.firstInput)
    const lastPlayed = useSelector((state) => state.time.lastPlayed)
    const wordGuessesForReload = useSelector((state) => state.time.wordGuessesForReload)
    const incorrectGuessesForReload = useSelector((state) => state.time.incorrectGuessesForReload)
    const turnForReload = useSelector((state) => state.time.turnForReload)
    const currentStreak = useSelector((state) => state.user.currentStreak)
    const maxStreak = useSelector((state) => state.user.maxStreak)
    const bestTry = useSelector((state) => state.user.bestTry)
    const gamesWon = useSelector((state) => state.user.gamesWon)
    const gamesPlayed = useSelector((state) => state.user.gamesPlayed)
    const winPercentage = useSelector((state) => state.user.winPercentage)
    const wordsGuessed = useSelector((state) => state.user.wordsGuessed)
    const words = useSelector((state) => state.user.words)
    const userToken = useSelector((state) => state.auth.userToken)

    const [turn, setTurn] = useState(turnForReload)
    const [currentGuess, setCurrentGuess] = useState('')
    // const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array
    const [guesses, setGuesses] = useState(wordGuessesForReload) // each guess is an array
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({}) // {a: 'grey', b: 'green', c: 'yellow'} etc
    // const [incorrectGuess, setIncorrectGuess] = useState(0);
    const [incorrectGuess, setIncorrectGuess] = useState(incorrectGuessesForReload);


    console.log('lastPlayed', lastPlayed);

    useEffect(() => {
        if (turnForReload === 0) {
            setGuesses([...Array(6)])
            setUsedKeys({})
            setTurn(0)
            setIncorrectGuess(0)
            dispatch(firstTimeInput(null))
        }
    }, [turnForReload])



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

    function createKeyIndexDict(arrayOfArrays) {
        const keyIndexDict = {};

        arrayOfArrays.forEach((innerArray, wordIndex) => {
            innerArray.forEach((obj, letterIndex) => {
                const { key } = obj;
                if (keyIndexDict.hasOwnProperty(key)) {
                    keyIndexDict[key].push(letterIndex);
                } else {
                    keyIndexDict[key] = [letterIndex];
                }
            });
        });

        return keyIndexDict;
    }

    useEffect(() => {
        setUsedKeys(prevUsedKeys => {

            let flatGuess = guesses.filter(guess => guess != undefined)

            const keyIndexDict = createKeyIndexDict(flatGuess);

            let currentWordArray = []
            if (words.length !== 0) {
                if (wordsGuessed < 20) {
                    currentWordArray = words[wordsGuessed].split('')
                }
            }


            for (const key in keyIndexDict) { // ireating the keys to check if its in the current word array
                if (currentWordArray.includes(key)) { // key found
                    let color = "yellow"
                    for (let i = 0; i < currentWordArray.length; i++) {
                        if (currentWordArray[i] === key) {
                            if (typeof keyIndexDict[key] !== "string") {
                                if (keyIndexDict[key].includes(i)) {
                                    color = 'green'
                                }
                            }
                        }
                    }
                    keyIndexDict[key] = color
                } else { // key not found
                    keyIndexDict[key] = 'grey'
                }
            }
            return keyIndexDict
        })
    }, [wordsGuessed])



    const handleReset = () => {
        setTurn(0);
        setCurrentGuess('')
        setGuesses([...Array(6)])
        // setHistory([])
        setIsCorrect(false)
        setUsedKeys({})
        setIncorrectGuess(0);
    }

    // format a guess into an array of letter objects 
    // e.g. [{key: 'a', color: 'yellow'}]
    const formatGuess = () => {
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((l) => {
            return { key: l, color: 'grey' }
        })

        // find any green letters
        formattedGuess.forEach((l, i) => {
            if (solution[i] === l.key) {
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })

        // find any yellow letters
        formattedGuess.forEach((l, i) => {
            if (solutionArray.includes(l.key) && l.color !== 'green') {
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null
            }
        })

        return formattedGuess
    }

    // add a new guess to the guesses state
    // update the isCorrect state if the guess is correct
    // add one to the turn state
    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setGuesses((prevGuesses) => [...prevGuesses, undefined]);
            setIsCorrect(true);

            // handleWinning

            let newWordsGuessed = wordsGuessed + 1;
            dispatch(setWordsGuessed(newWordsGuessed))

            let newGamesWon = gamesWon + 1;
            // let newCurrentStreak = currentStreak + 1;
            // let newBestTry = currentStreak + 1;
            let newGamesPlayed = gamesPlayed + 1

            // newWordsGusseed !== 20 which mean calculate  current streak
            // dispatch(setCurrentStreak(newCurrentStreak));
            if (newWordsGuessed > bestTry) {
                dispatch(setBestTry(newWordsGuessed));
            }
            // if (newCurrentStreak > maxStreak) {
            //     dispatch(setMaxStreak(newCurrentStreak));
            // }

            //Calculate Win Percentage + Games Played + Games Won
            if (newWordsGuessed === 20) {

                if (lastPlayed === null) {
                    dispatch(setLastPlayed(new Date()))
                    dispatch(setCurrentStreak(1))
                    dispatch(setMaxStreak(1))
                } else {
                    const lastPlayedMoment = moment(lastPlayed); // Example date
                    const currentDate = moment();
                    const dayDifference = currentDate.diff(lastPlayedMoment, 'days');
                    dispatch(setLastPlayed(new Date()))
                    if (dayDifference === 1) {
                        // Increase current streak and update max streak
                        dispatch(setCurrentStreak((currentStreak + 1)))
                        dispatch(setMaxStreak((maxStreak + 1)))
                    } else {
                        // Reset current streak
                        dispatch(setCurrentStreak((0)))
                    }
                }

                // dispatch(setIsPlayed(true))
                dispatch(openShowModal());
                let winPercentage = (newGamesWon / (newGamesPlayed)) * 100;
                winPercentage = Math.round(winPercentage)
                dispatch(setWinPercentage(winPercentage));
                dispatch(setGamesPlayed(newGamesPlayed));
                dispatch(setGamesWon(newGamesWon));
                // dispatch(setCurrentStreak(0));
                dispatch(gameEndTime());
                if (userToken !== null) {
                    handleSetStats();
                }
            }

        } else {
            setIncorrectGuess((prevIncorrectGuess) => prevIncorrectGuess + 1);
            let newIncorrectGuesses = incorrectGuess + 1
            // Game should end you lost and reset stats
            if (newIncorrectGuesses === 6) {

                if (lastPlayed === null) {
                    dispatch(setLastPlayed(new Date()))
                    dispatch(setCurrentStreak(1))
                    dispatch(setMaxStreak(1))
                } else {
                    const lastPlayedMoment = moment(lastPlayed); // Example date
                    const currentDate = moment();
                    const dayDifference = currentDate.diff(lastPlayedMoment, 'days');
                    dispatch(setLastPlayed(new Date()))
                    if (dayDifference === 1) {
                        // Increase current streak and update max streak
                        dispatch(setCurrentStreak((currentStreak + 1)))
                        dispatch(setMaxStreak((maxStreak + 1)))
                    } else {
                        // Reset current streak
                        dispatch(setCurrentStreak((0)))
                    }
                }

                let newGamesPlayed = gamesPlayed + 1
                dispatch(setGamesPlayed(newGamesPlayed));
                // dispatch(setCurrentStreak(0))
                let newWinPercentage = ((gamesWon) / (newGamesPlayed)) * 100;
                newWinPercentage = Math.round(newWinPercentage)
                dispatch(setWinPercentage(newWinPercentage));
                dispatch(openShowModal());
                dispatch(gameEndTime());
                if (userToken !== null) {
                    handleSetStats();
                }
            }
            //You have tries left but the word is incorrect
            // else {
            // dispatch(setCurrentStreak(0));
            // dispatch(setMaxStreak(0));
            // }
        }

        setGuesses(prevGuesses => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })

        setTurn(prevTurn => {
            return prevTurn + 1
        })

        setUsedKeys(prevUsedKeys => {

            let flatGuess = guesses.filter(guess => guess != undefined)
            flatGuess = [...flatGuess, formattedGuess];

            const keyIndexDict = createKeyIndexDict(flatGuess);

            let currentWordArray = []
            if (words.length !== 0) {
                currentWordArray = words[wordsGuessed].split('')
            }


            for (const key in keyIndexDict) { // ireating the keys to check if its in the current word array
                if (currentWordArray.includes(key)) { // key found
                    let color = "yellow"
                    for (let i = 0; i < currentWordArray.length; i++) {
                        if (currentWordArray[i] === key) {
                            if (typeof keyIndexDict[key] !== "string") {
                                if (keyIndexDict[key].includes(i)) {
                                    color = 'green'
                                }
                            }
                        }
                    }
                    keyIndexDict[key] = color
                } else { // key not found
                    keyIndexDict[key] = 'grey'
                }
            }

            return keyIndexDict
        })

        setCurrentGuess('')
    }

    // handle keyup event & track current guess
    // if user presses enter, add the new guess
    const handleKeyup = ({ key }) => {
        if (key === 'Enter') {
            // only add guess if turn is less than 5
            if (incorrectGuess > 5) {
                console.log('you used all your guesses!')
                return
            }

            // check word is 5 chars
            if (currentGuess.length !== 5) {
                console.log('word must be 5 chars.')
                return
            }

            if (!totalWordsArray.includes(currentGuess)) {
                toast.error('Not a correct word.')
                return
            }

            const formatted = formatGuess()
            addNewGuess(formatted)
        }
        if (key === 'Backspace') {
            setCurrentGuess(prev => prev.slice(0, -1))
            return
        }
        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                if (firstInput === null) {
                    dispatch(firstTimeInput())
                }
                let lowerCaseKey = key.toLowerCase()
                setCurrentGuess(prev => prev + lowerCaseKey)
            }
        }
    }



    return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup, incorrectGuess, handleReset }
}

export default useWordle