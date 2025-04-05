import { Component } from '@angular/core';
import { LetterSwitcherComponent } from "../letter-switcher/letter-switcher.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playground',
  imports: [LetterSwitcherComponent, FormsModule, CommonModule],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss'
})
export class PlaygroundComponent {
  word: string = '';
  letters: string[] = [];

  onWordChange() {
    this.letters = this.word.toUpperCase().replace(/[^A-Z]/g, '').split('');
    console.log(this.letters);
  }

}
