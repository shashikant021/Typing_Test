import { Component, ElementRef, Input, OnInit, OnChanges, QueryList, ViewChild, ViewChildren, SimpleChanges } from '@angular/core';
import { Word, Test } from '../models/models';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { timer } from 'rxjs/internal/observable/timer';
import { CalculateService } from '../services/calculate.service';

@Component({
  selector: 'app-test-box',
  templateUrl: './test-box.component.html',
  styleUrls: ['./test-box.component.scss']
})
export class TestBoxComponent implements OnInit, OnChanges{
  
  @Input() duration: number = 0;
  @Input() testType: "simple"|"advance" = "simple";
  placeHolder = "Start typing...";
  words: Word[] = [];
  currentWord: Word;
  previousInput = "";
  inputField: FormControl;
  wordBoxPosition = '0px';
  isFirstInput = true;
  counter?: Subscription;
  counterTime: number = 0;
  wordsBoxDisplay: string = 'block';
  msgBoxDisplay: string = 'none';
  logInErrorBoxDisplay: string = 'none';
  resultBoxDisplay = 'none';
  testResult?: Test;
  @ViewChildren('wordRef') wordRef?: QueryList<ElementRef>;
  @ViewChild('visibleArea') visibleArea?: ElementRef;
  
  
  constructor(private calService: CalculateService){
    this.inputField = new FormControl("");
    this.currentWord = new Word(-1, '');
  }

  ngOnInit(): void {
    this.startTest();   
  }

  ngOnChanges(change: SimpleChanges): void{
    this.counterTime = this.duration * 60;
    this.startTest()
  }

  startTest(){
    this.setWords();
    this.counter?.unsubscribe();
    this.wordsBoxDisplay = 'block';
    this.msgBoxDisplay = 'none';
    this.counterTime = this.duration * 60;
    this.resultBoxDisplay = 'none';
    this.logInErrorBoxDisplay = 'none';
    this.wordBoxPosition = '0px';
    this.inputField = new FormControl("");
    this.isFirstInput = true;
    this.placeHolder = "Start typing...";
    this.inputField.valueChanges.subscribe((newVal)=>{
      this.runTypingTestAlgorithm(newVal);    
  });
  }

  setWords(){
    if(this.testType === "simple")
      this.words = this.calService.generateSimpleWords(this.duration);
    else 
      this.words = this.calService.generateAdvanceWords(this.duration);
    
    this.currentWord = this.words[0];
    this.currentWord.isCurrent = true;
  }

  runTypingTestAlgorithm(newInput: string){
    if(this.isFirstInput){
      this.isFirstInput = false;
      this.placeHolder = "";
      this.counter = timer(1000, 1000).subscribe((res)=>{
        --this.counterTime;
        if(this.counterTime === 0) {
          this.testOver();
          return;
        }
      })
    }

    let isBackSpace: boolean = this.previousInput.length-1 == newInput.length; 

    if(this.endWithSpace(newInput)){
      let trimmedInput = newInput.trimRight(); 
      
      ++this.currentWord.characters;
      ++this.currentWord.correctCharacters;

      let isCorrectWord = this.currentWord.value === trimmedInput;
      this.currentWord.isCorrect = isCorrectWord;
      this.currentWord.isWrong = !isCorrectWord;

      this.currentWord.isCurrent = false;
      this.currentWord.isCurrentWrong = false;

      if(this.currentWord.index+1 === this.words.length) {
        this.counterTime = 0;
        this.testOver();
      }

      this.currentWord = this.words[this.currentWord.index+1];
      this.currentWord.isCurrent = true;
      this.currentWord.isCurrentWrong = false;
      this.previousInput = "";

      let currentWordPosition = this.wordRef
        ?.get(this.currentWord.index)
        ?.nativeElement.getBoundingClientRect();

      let visibleAreaPosition = 
        this.visibleArea?.nativeElement.getBoundingClientRect();
      
      if(currentWordPosition.top - visibleAreaPosition.top > 20){
        this.wordBoxPosition = 
          parseInt(this.wordBoxPosition) - 50 + 'px'.toString();
      }

      this.inputField.setValue("");
      return;
    }

    let isCurrentWordTillInputSame: boolean = 
      this.currentWord.value.length >= newInput.length ?
      this.currentWord.value.slice(0, newInput.length) === newInput :
      false;
    
    this.currentWord.isCurrent = isCurrentWordTillInputSame;
    this.currentWord.isCurrentWrong = !isCurrentWordTillInputSame;

    let isCurrentCharacterCorrect = 
      this.currentWord.value.length >= newInput.length ?
      this.currentWord.value.charAt(newInput.length-1) === newInput.charAt(newInput.length-1) :
      false;

    if(!isBackSpace){
      ++this.currentWord.characters;
      if(isCurrentCharacterCorrect) ++this.currentWord.correctCharacters;
      else ++this.currentWord.wrongCharacters;
    }

    this.previousInput = newInput;
  }

  endWithSpace(str: string):boolean{
    return str.charAt(str.length -1) === ' '? true : false;
  }

  testOver(){
    this.counter?.unsubscribe();
    this.inputField.setValue('');
    this.inputField.disable();
    this.wordsBoxDisplay = 'none';
    this.msgBoxDisplay = 'flex';
    this.resultData();
  }

  resultData(){
    let typedWords: Word[] = [];
    for(let word of this.words){
      if((word.index < this.currentWord.index) ||
        (word.index === this.currentWord.index && word.characters > 0)){
          typedWords.push(word)
      }
    }
    this.testResult = this.calService.calculateResult(typedWords, this.duration, this.testType);
    this.resultBoxDisplay = 'block';
    this.logInErrorBoxDisplay = 'block';
  }
}