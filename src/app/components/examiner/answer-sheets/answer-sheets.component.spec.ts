import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerSheetsComponent } from './answer-sheets.component';

describe('AnswerSheetsComponent', () => {
  let component: AnswerSheetsComponent;
  let fixture: ComponentFixture<AnswerSheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerSheetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
