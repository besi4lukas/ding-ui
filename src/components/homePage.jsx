import React, { useState } from 'react';
import StartPageComponent from './startPage';
import GamePageComponent from './gamePage';

const HomePageComponent = () => {
    const [showGameBoard, setShowGameBoard] = useState(false);
    const [inputLength, setInputLength] = useState(3)
    const [guessNumber, setGuessNumber] = useState([])
    return(
        <>
            { showGameBoard 
            ? <GamePageComponent 
                setShowGameBoard={setShowGameBoard} 
                inputLength={inputLength} 
                guessNumber={guessNumber}
                setInputLength={setInputLength}/> 
            : <StartPageComponent 
                setShowGameBoard={setShowGameBoard} 
                setInputLength={setInputLength} 
                inputLength={inputLength} 
                setGuessNumber={setGuessNumber} />}
        </>
    );
}

export default HomePageComponent;