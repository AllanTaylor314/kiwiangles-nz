import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoComponent } from "../photo/photo.component";
import { LetterPhoto } from '../letter-photo';
import { LettersService } from '../letters.service';

@Component({
  selector: 'app-collection',
  imports: [PhotoComponent, CommonModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss'
})
export class CollectionComponent {
  @Input() letterPhotos?: LetterPhoto[];
  lettersService: LettersService = inject(LettersService);
  constructor() {
    if (this.letterPhotos !== null) {
      this.letterPhotos = this.lettersService.getLetters();
    }
  }
}
