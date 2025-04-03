import { Component, inject } from '@angular/core';
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
  letterPhotos: LetterPhoto[] = [];
  lettersService: LettersService = inject(LettersService);
  constructor() {
    this.letterPhotos = this.lettersService.getLetters();
  }
}
