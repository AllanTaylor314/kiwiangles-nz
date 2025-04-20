import { Component, inject } from '@angular/core';
import { LetterSwitcherComponent } from "../letter-switcher/letter-switcher.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

interface LetterWithInitialId {
  letter: string;
  id?: string;
}
@Component({
  selector: 'app-playground',
  imports: [LetterSwitcherComponent, FormsModule, CommonModule],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss'
})
export class PlaygroundComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  location: Location = inject(Location);
  word: string = '';
  letters: LetterWithInitialId[] = [];
  postage = 3.60;
  showMessageBody = false;
  emailAddress = "kiwi.angles.nz@gmail.com";
  copySuccess = false;

  ngOnInit() {
    let letterIds: string[] = this.route.snapshot.params['letterIds'] || [];
    console.log(this.route.snapshot.params['letterIds']);
    this.route.params.subscribe(params => {
      letterIds = params['letterIds'] ? params['letterIds'].split('-') : [];
      this.word = letterIds.map(id => id[0]).join('');
      this.letters = letterIds.map(id => ({ letter: id[0], id: id }));
    })
  };

  onWordChange() {
    const newLetters = this.word.toUpperCase().replace(/[^A-Z]/g, '').split('');
    const updatedLetters: LetterWithInitialId[] = [];
    const usedIndices = new Set<number>();

    // AI generated stuff that tries to preserve the IDs of the letters that are already in the list
    // TODO: use a better algorithm that doesn't move later letters when the first letters are changed
    // i.e. some form of a diff algorithm
    newLetters.forEach((letter) => {
      // Find the first unused matching letter in the existing list
      const matchingIndex = this.letters.findIndex(
        (existingLetter, index) => !usedIndices.has(index) && existingLetter.letter === letter
      );

      if (matchingIndex !== -1) {
        updatedLetters.push(this.letters[matchingIndex]); // Preserve the ID for matching letters
        usedIndices.add(matchingIndex); // Mark this index as used
      } else {
        updatedLetters.push({ letter: letter }); // Create a new letter without an ID
      }
    });

    this.letters = updatedLetters;
    this.updateRouteParams();
   }

  onLetterIdChange(index: number, newId: string) {
    if (this.letters[index]) {
      this.letters[index].id = newId;
      this.updateRouteParams();
    }
  }

  private updateRouteParams() {
    const newUrl = this.route.snapshot.pathFromRoot
      .map(segment => segment.routeConfig?.path)
      .filter(Boolean)
      .join('/')
      .replace(/:letterIds/, this.letters.map(l => l.id).join('-'));
    this.location.replaceState(newUrl);
  }

  getCost(numLetters: number): number {
    if (numLetters <= 0) {
      return 0;
    } else if (numLetters <= 6) {
      return 3 * numLetters;
    } else {
      return 2 * numLetters + 6;
    }
  }

  getMessageBody(): string {
    return `Name:
Postal Address:

Letters: ${this.letters.map(l => l.id).join('-')}

Subtotal: $${this.getCost(this.letters.length).toFixed(2)} (${this.letters.length} letters)
Postage: $${this.postage.toFixed(2)}
Total: ${(this.postage + this.getCost(this.letters.length)).toFixed(2)}

Payment details will be sent to you once the order is confirmed.
Payment can be made by bank transfer.
    `;
  }

  getEmailLink() {
    const subject = 'KiwiAngles NZ - Order form';
    return `mailto:${this.emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(this.getMessageBody())}`;
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.getMessageBody()).then(
      () => {
        this.copySuccess = true;
        console.log('clipboard successfully set');
      },
      () => {
        this.showMessageBody = true;
        console.error('clipboard write failed');
      }
    );
  }
}
