import { Injectable } from '@angular/core';
import { Test, Word } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {
  
  constructor() { }
  calculateResult(words: Word[], duration: number, testType: string): Test{
    let testResult: Test = {
      time: new Date().toString(),
      
      duration: duration,
      type: testType,
      netWPM: 0,
      grossWPM: 0,
      accuracy: 0,
      top: 0,
      characters: 0,
      correctCharacters: 0,
      wrongCharacters: 0,
      words: 0,
      correctWords: 0,
      wrongWords: 0,
    };
    for(let word of words){
      (word.isCorrect || word.isWrong) && ++testResult.words;
      word.isCorrect && ++testResult.correctWords;
      word.isWrong && ++testResult.wrongWords;

      testResult.characters += word.characters;
      testResult.correctCharacters += word.correctCharacters;
      testResult.wrongCharacters += word.wrongCharacters;
    }
    
    const cal = testType === 'simple'? 5: 10;
    testResult.grossWPM = Math.round(testResult.characters / (cal * duration));
    testResult.netWPM = Math.round(testResult.correctCharacters / (cal * duration));

    testResult.accuracy = (testResult.correctCharacters / testResult.characters) * 100;
    testResult.accuracy = parseFloat(testResult.accuracy.toFixed(2));

    switch(true){
      case testResult.accuracy > 95:
        testResult.top = 5;
        break;

      case testResult.accuracy > 88:
        testResult.top = 10;
        break;

      case testResult.accuracy > 75:
        testResult.top = 20;
        break;
      
      case testResult.accuracy > 65:
        testResult.top = 25;
        break; 
      
      case testResult.accuracy > 50:
        testResult.top = 35;
        break;
      
      default:
        testResult.top = 50;
        
    }

    return testResult;
  }

  private simpleStrings = [
    'Every night, James would dream about being alone on a small island.',
    'There was a young woman named Grace who was born in the wrong place.',
    'She had a small house in the city, but she wanted to live in the country.',
    'One day, she decided to pack her bags and move to a small town.',
    'She found a small house on a quiet street and knew it was the right place.',
    'Every morning, she would wake up to the sound of birds singing.',
    'She would spend her days gardening and taking long walks in the forest.',
    'At night, she would sit on her porch and watch the stars.',
    'She was finally living the life she had always dreamed of.',
    'And every night, she would go to sleep with a smile on her face.',
    'Every child needs a place where they feel safe and loved.',
    'There is a place in the heart that will never be filled.',
    'A place where every path leads to a new adventure.',
    'A place where every turn brings a new surprise.',
    'A place where every moment is filled with joy and wonder.',
    'A place where every dream is possible and every wish comes true.',
    'A place where every day is a celebration of life.',
    'A place where every memory is a treasure to be cherished.',
    'A place where every goodbye is a promise of a new hello.',
    'A place where every ending is just the beginning of a new journey.'
  ];

  private advanceStrings = [
    'The magnificent sunset painted the evening sky with shades of orange and purple.',
    'In the heart of the forest, the mysterious creature remained unseen.',
    'The architecture of the ancient cathedral was breathtaking.',
    'She discovered an unexpected treasure in the dusty old bookstore.',
    'The astronaut gazed at the spectacular view of Earth from space.',
    'The mountaineer reached the summit after a grueling climb.',
    'The scientist dedicated his life to groundbreaking research.',
    'The novelist worked tirelessly on her masterpiece.',
    'The philanthropist donated a substantial amount to the charity.',
    'The archaeologist uncovered artifacts from a forgotten civilization.',
    'The photographer captured the breathtaking beauty of the landscape.',
    'The detective was determined to solve the mysterious case.',
    'The journalist traveled extensively to report on international affairs.',
    'The entrepreneur launched a successful start-up in the technology sector.',
    'The conservationist dedicated her life to protecting endangered species.',
    'The historian spent decades studying ancient civilizations.',
    'The psychologist helped his patients navigate their emotional challenges.',
    'The environmentalist advocated for sustainable practices to combat climate change.',
    'The biographer meticulously researched the life of the famous artist.',
    'The mathematician made significant contributions to theoretical physics.'
  ];

  generateSimpleWords(duration: number): Word[] {
    return this.generateWords(this.simpleStrings, duration);
  }

  generateAdvanceWords(duration: number): Word[] {
    return this.generateWords(this.advanceStrings, duration);
  }

  private generateWords(strings: string[], duration: number): Word[]{
    const words: Word[] = [];
    let wordIndex = 0;
    for(let i = 0; i < 10*duration; i++) {
      let index = Math.floor(Math.random() * 20);
      const str = strings[index];
      for(let word of str.split(" ")){  
        words.push(new Word(wordIndex, word));
        wordIndex++;
      }
    }
    return words;
  }

}
