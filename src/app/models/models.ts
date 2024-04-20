export class Navigation{
    name: string = "";
    path: string = "";
}

export class Word{
    index: number;
    value: string;
    isCurrent: boolean;
    isCurrentWrong: boolean;
    isCorrect: boolean;
    isWrong: boolean;
    characters: number;
    correctCharacters: number;
    wrongCharacters: number;

    constructor(index: number, value: string){
        this.index = index;
        this.value = value;
        this.isCurrent = false;
        this.isCurrentWrong = false;
        this.isCorrect = false;
        this.isWrong = false;
        this.characters = 0;
        this.correctCharacters = 0;
        this.wrongCharacters = 0;
    }
}

export interface Test{
    id?: number;
    userId?: number;

    time: string;
    duration: number;
    type: string;

    netWPM: number;
    grossWPM: number;
    accuracy: number;
    top: number

    characters: number;
    correctCharacters: number;
    wrongCharacters: number;

    words: number;
    correctWords: number;
    wrongWords: number;
}