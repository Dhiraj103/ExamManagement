import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnswerSheetComponent } from './add-answer-sheet.component';

describe('AddAnswerSheetComponent', () => {
  let component: AddAnswerSheetComponent;
  let fixture: ComponentFixture<AddAnswerSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnswerSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnswerSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
