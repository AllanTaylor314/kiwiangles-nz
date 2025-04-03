import { Component } from '@angular/core';
import { CollectionComponent } from "../collection/collection.component";

@Component({
  selector: 'app-gallery',
  imports: [CollectionComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {

}
