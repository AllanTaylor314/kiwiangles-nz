import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() letterId?: string;
  @Output() letterIdChange = new EventEmitter<string>();
  lettersService: LettersService = inject(LettersService);
  letterPhotos: LetterPhoto[] = [];
  index: number = 0;


  ngOnChanges() {
    if (this.letter) {
      this.letterPhotos = this.lettersService.getLettersByLetter(this.letter);
      if (this.letterId === undefined) {
        this.index = Math.floor(Math.random() * this.letterPhotos.length);
        setTimeout(() => {
          this.updateLetterId(this.letterPhotos[this.index].id);
        });
      } else {
        this.index = this.letterPhotos.findIndex(letterPhoto => letterPhoto.id === this.letterId);
        if (this.index === -1) {
          this.index = 0;
        }
        this.updateLetterId(this.letterPhotos[this.index].id);
      }
    }
  }

  next() {
    this.index = (this.index + 1) % this.letterPhotos.length;
    this.updateLetterId(this.letterPhotos[this.index].id);
  }

  previous() {
    this.index = (this.index - 1 + this.letterPhotos.length) % this.letterPhotos.length;
    this.updateLetterId(this.letterPhotos[this.index].id);
  }

  options() {

  }

  letterIdChangeHandler(event: any) {
    this.updateLetterId(event.target.value);
    this.index = this.letterPhotos.findIndex(letterPhoto => letterPhoto.id === this.letterId);
    if (this.index === -1) {
      this.index = 0;
    }
    this.updateLetterId(this.letterPhotos[this.index].id);
  }

  updateLetterId(newId: string): void {
    this.letterId = newId;
    this.letterIdChange.emit(newId);
  }
}
