import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import * as words from './hangman_words.json';

@Component({
  selector: 'app-word-length',
  templateUrl: './word-length.component.html',
  styleUrls: ['./word-length.component.scss']
})
export class WordLengthComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService) {
  }

  public words = words.default;
  public narrowedWords = [];
  public finalWord = '';
  public tooShortWord = false;
  public weGotOurWord: boolean | undefined;

  ngOnInit(): void {
  }

  pickWordByLength(wordLength: number): void {
    // leszűkítjük a szavakat hossz alapján
    this.narrowedWords = this.words.filter((word: string | any[]) => word.length <= wordLength);

    // a leszűkített tömbből random kiválasztunk egyet
    this.finalWord = this.narrowedWords[Math.floor(Math.random() * this.words.length)];

    // ha van végleges szavunk megjelenítjük a tovább gombot
    this.weGotOurWord = !!this.finalWord?.length;

    // ha túl rövid a szó kiírjuk az üzenetet
    this.tooShortWord = !this.finalWord?.length;

    // elmentjük a végleseg szót nagybetűkkel
    this.localStorageService.setItem('word', this.finalWord.toUpperCase());
  }

  pickWordRandom(): void {
    // random kiválasztunk egy szót
    this.finalWord = this.words[Math.floor(Math.random() * this.words.length)];

    // ha van végleges szavunk megjelenítjük a tovább gombot
    this.weGotOurWord = !!this.finalWord?.length;

    // elmentjük a végleseg szót nagybetűkkel
    this.localStorageService.setItem('word', this.finalWord.toUpperCase());
  }


}
