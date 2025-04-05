import { Component, inject, Input } from '@angular/core';
import { LetterPhoto } from '../letter-photo';
import { LettersService } from '../letters.service';
import { PhotoComponent } from "../photo/photo.component";

@Component({
  selector: 'app-letter-switcher',
  imports: [PhotoComponent],
  templateUrl: './letter-switcher.component.html',
  styleUrl: './letter-switcher.component.scss'
})
export class LetterSwitcherComponent {
  @Input() letter!: string;
  lettersService: LettersService = inject(LettersService);
  letterPhotos: LetterPhoto[] = [];
  index: number = 0;

  ngOnInit() {
    this.index = Math.floor(Math.random() * this.lettersService.getLettersByLetter(this.letter).length);
  }

  ngOnChanges() {
    if (this.letter) {
      this.letterPhotos = this.lettersService.getLettersByLetter(this.letter);
      console.log(this.letterPhotos);
    }
  }

  next() {
    this.index = (this.index + 1) % this.letterPhotos.length;
  }

  previous() {
    this.index = (this.index - 1 + this.letterPhotos.length) % this.letterPhotos.length;
  }

  options() {

  }
}
