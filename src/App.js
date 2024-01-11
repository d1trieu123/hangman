
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


const words = corpus()

let selectedWord = words[Math.floor(Math.random() * words.length)]

function App() {
  
  const [known, setKnown] = useState(["-","-","-","-","-"])
  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [showNotification, setShowNotification] = useState(false)
  const [guess, setGuess] = useState("")
 


  useEffect(()=>{
    const handleKeydown = event => {
      const {key, keyCode} = event
      
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        setGuess(letter)
        let gameState = known
        if (selectedWord.includes(letter)) {
          let index = selectedWord.indexOf(letter)
          gameState[index] = letter
          setKnown(gameState)
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters,letter])
          } else {
            alert(setShowNotification)
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(wrongLetters => [...wrongLetters,letter])
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
        <Stats guess={guess} known={known} wrongLetters={wrongLetters} correctLetters={correctLetters}/>
        
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain}/>
      <Notification showNotification={showNotification}/>
      
    </>
  );
}

export default App;
