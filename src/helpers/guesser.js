
import {corpus} from "./corpus.js"

export function getGuess(known, correct, incorrect){
    let possible_guesses = new Set("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    possible_guesses = new Set([...possible_guesses].filter(char => !correct.has(char) && !incorrect.has(char)));
    let wordMap = new Map()

    let next_guess = "";
    let next_prob = 0.0;
    let possible_words = [];
    
    for (let i in corpus) {
        word = corpus[i]
        let compatible = true;

        for (let spot = 0; spot < word.length; spot++) {
            let char = word[spot];
            if (correct.has(char)) {
                if (known[spot] !== char) {
                    compatible = false;
                    break;
                }
            } else if (incorrect.has(char)) {
                compatible = false;
                break;
            } else if (known[spot] !== "-" && known[spot] !== char) {
                compatible = false;
                break;
            }
        }
        
        if (compatible) {
            possible_words.push(word);
        }
    }
    
    let sum_of_possible_words = 0;
    
    for (let word of possible_words) {
        sum_of_possible_words += (1/corpus.length)
    }

    for (let letter of possible_guesses) {
        let letter_prob = 0.0;
        for (let word of possible_words) {
            let second_term = word.includes(letter) ? 1 : 0;
            let first_term = (1/corpus.length) / sum_of_possible_words;
            letter_prob += first_term * second_term;
            wordMap.set(letter, letter_prob)
        }

        if (letter_prob > next_prob) {
            next_guess = letter;
            next_prob = letter_prob;
        }   
    }
    console.log(wordMap)
    return [next_guess, next_prob, wordMap]
    
}