import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterSwitcherComponent } from './letter-switcher.component';

describe('LetterSwitcherComponent', () => {
  let component: LetterSwitcherComponent;
  let fixture: ComponentFixture<LetterSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LetterSwitcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetterSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
