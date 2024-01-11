import React from 'react'
import { getGuess } from '../helpers/guesser'

const Stats = ({guess, known, correctLetters, wrongLetters}) => {
    let knownString = known.join("")
    let correctSet = new Set(correctLetters)
    let wrongSet = new Set(wrongLetters)
    let best_guess, best_prob, wordMap = getGuess(knownString, correctSet, wrongSet)
    let guess_prob = wordMap.get(guess)
    return (
    <div>
        <p>{best_guess} {best_prob}</p>
        <p>{guess} {guess_prob}</p>
        
    </div>
    )
}

export default Stats

