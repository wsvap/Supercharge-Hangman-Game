import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService,
              private router: Router) {
  }

  public word = '';
  public wordLength = 0;
  public wordBox = '';
  public tries = 0;
  public statusWin = false;
  public statusLost = false;
  public letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  public usedLetters: string[] = [];

  ngOnInit(): void {
    this.word = this.localStorageService.getItem('word');
    this.wordLength = this.word.length;
    this.wordBox = '_ '.repeat(this.word.length);

    // TODO: ezt kiszedni!
    console.log('WORD:', this.word);
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  letterClick(letter: string, e: any) {
    // a használt betűt disabled-re állítjuk
    e.target.disabled = true;

    this.tries = this.word.indexOf(letter) === -1 ? this.tries++ : this.tries;

    if (this.word.indexOf(letter) === -1) {
      this.tries++;
    }

    const hiddenWordArray = this.wordBox.split(' ');
    for (let i = 0; i < this.word.length; i++) {
      if (this.word[i] === letter) {
        hiddenWordArray[i] = letter;
      }
    }

    // lementjük a betűket
    this.usedLetters.push(letter);
    this.localStorageService.setItem('Letters', JSON.stringify(this.usedLetters));

    this.wordBox = hiddenWordArray.join(' ');
    this.gameState();
  }

  gameState(): void {
    const wordArray = this.wordBox.split(' ');
    const wordCheck = wordArray.join('');

    // ha meg van a szó nyert
    this.statusWin = wordCheck === this.word;

    // maximum tízszer próbálkozhat és utána vesztett
    this.statusLost = this.tries >= 10;
  }

  reloadGame(): void {
    // kiürítjük a szót a local-ból
    this.localStorageService.clear();

    // vissza a választóra
    this.router.navigateByUrl('/word-length');
  }

  endGame(): void {
    // kiürítjük a szót local-ból
    this.localStorageService.clear();

    // vissza a nyitóra
    this.router.navigateByUrl('/instructions');
  }
}
