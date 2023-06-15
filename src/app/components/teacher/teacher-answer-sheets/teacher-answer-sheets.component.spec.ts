import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAnswerSheetsComponent } from './teacher-answer-sheets.component';

describe('TeacherAnswerSheetsComponent', () => {
  let component: TeacherAnswerSheetsComponent;
  let fixture: ComponentFixture<TeacherAnswerSheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAnswerSheetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAnswerSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
