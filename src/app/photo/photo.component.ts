import { Component, Input } from '@angular/core';
import { LetterPhoto } from '../letter-photo';

@Component({
  selector: 'app-photo',
  imports: [],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss'
})
export class PhotoComponent {
  @Input() letterPhoto!: LetterPhoto;
}
