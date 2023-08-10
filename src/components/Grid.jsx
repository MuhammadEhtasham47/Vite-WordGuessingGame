import React, { useRef } from 'react';
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
                onKeyDown={handleKeyup}
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
