import React, { useEffect, useRef } from 'react';
import Row from './Row';

export default function Grid({ guesses, currentGuess, turn, incorrectGuess, handleKeyup }) {
    const inputRef = useRef(null);

    const handleClick = () => {
        if (window.innerWidth <= 768) { // Adjust the threshold for mobile screen width
            console.log('Mobile screen width');
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
        else {
            console.log(' laptop screen');
        }
    };

    return (
        <div onClick={handleClick} tabIndex={0} style={{ outline: 'none', }}>
            <input
                ref={inputRef}
                type="text"
                style={{
                    position: 'absolute',
                    left: '-9999px',
                    opacity: '0',
                }}
                onKeyUp={(e) => {
                    // if (e.keyCode === 13) {
                    //     handleKeyup({ key: 'Enter' })
                    //    if (e.keyCode === 8) {
                    //         handleKeyup({ key: 'Backspace' })
                    //     }
                    //     else
                    if (e.keyCode !== 8 || e.keyCode === 13) {
                        var inputValue = e.target.value;
                        var lastLetter = inputValue.charAt(inputValue.length - 1);
                        handleKeyup({ key: lastLetter })
                    }

                    e.target.value = ''
                }}
            />
            {guesses.map((g, i) => {
                if (turn === i) {
                    return <Row key={i} currentGuess={currentGuess} incorrectGuess={incorrectGuess} />;
                }
                return <Row key={i} guess={g} incorrectGuess={incorrectGuess} />;
            })}
        </div>
    );
}
