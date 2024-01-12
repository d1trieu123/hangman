import React, {useState} from 'react'


const Stats = ({  guess, guessProb, bestGuess, bestProb, toggleHint, showHint}) => {

    return (
    <div>
        <button onClick={toggleHint}>Toggle Hints</button>
        {showHint && <p> The best guess was "{bestGuess}" which had a {(bestProb*100).toFixed(2)}% chance to be correct  </p>}
        <p>You guessed "{guess}" which had a {(guessProb*100).toFixed(2)}% chance to be correct</p>
        
    </div>
    )
}

export default Stats

