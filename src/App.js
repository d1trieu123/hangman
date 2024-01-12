
import './App.css';
import Header from "./components/Header"
import Figure from "./components/Figure"
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import React, {useState, useEffect} from 'react';
import Notification from './components/Notification';
import Popup from './components/Popup';
import { showNotification as alert } from './helpers/helpers';
import {corpus} from "./helpers/corpus"
import Stats from './components/Stats';
import StatPrompt from './components/StatPrompt';
import {getGuess} from './helpers/guesser';


const words = corpus()

let selectedWord = words[Math.floor(Math.random() * words.length)]
let correctSet = new Set()
let wrongSet = new Set()
let initial_vals = getGuess("-----", correctSet, wrongSet,"")
let first_guess = initial_vals[0]
let first_prob = initial_vals[1]
let guess_prob = initial_vals[2]
function App() {
  
  const [known, setKnown] = useState(["-","-","-","-","-"])
  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [showNotification, setShowNotification] = useState(false)
  const [guess, setGuess] = useState("")
  const [playing, setPlaying] = useState(false)
  const [bestGuess, setBestGuess] = useState(first_guess)
  const [bestProb, setBestProb] = useState(first_prob)
  const [guessProb, setGuessProb] = useState(guess_prob)
  useEffect(()=>{
    const handleKeydown = event => {
      const {key, keyCode} = event
      if (playable && keyCode >= 65 && keyCode <= 90) {
        setPlaying(true)
        const letter = key.toLowerCase();
        setGuess(letter)
        if(!correctLetters.includes(letter) && !wrongLetters.includes(letter))
        {
          let newStuff = getGuess(known,correctSet,wrongSet, letter)
          setBestGuess(newStuff[0])
          setBestProb(newStuff[1])
          setGuessProb(newStuff[2])
        }
        else{
          setGuessProb(guessProb)
        }
        
        let gameState = known
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters,letter])
            correctSet.add(letter)
            let index = selectedWord.indexOf(letter)
            gameState[index] = letter
            setKnown(gameState)            
          } else {
            alert(setShowNotification)
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(wrongLetters => [...wrongLetters,letter])
            wrongSet.add(letter)
          } else {
            alert(setShowNotification)
          }
        }
      }
      
      
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown);
  },[correctLetters, wrongLetters, playable]);
 function playAgain() {
  setPlayable(true)
  setCorrectLetters([])
  setWrongLetters([])
  setKnown(["-","-","-","-","-"])
  setGuess("")
  setPlaying(false)
  setBestGuess(first_guess)
  setBestProb(first_prob)
  setGuessProb(0)
  correctSet.clear()
  wrongSet.clear()

  const random =  Math.floor(Math.random() * words.length)
  selectedWord = words[random]

 }
  return (
    <>
      <Header/>
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters}/>
        <Word  selectedWord={selectedWord} correctLetters={correctLetters}/>
        
        
      </div>
      {!playing && <StatPrompt/> }
      { playing && <Stats guess={guess} guessProb={guessProb} bestGuess={bestGuess} bestProb={bestProb} />}
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain}/>
      <Notification showNotification={showNotification}/>
      
    </>
  );
}

export default App;
