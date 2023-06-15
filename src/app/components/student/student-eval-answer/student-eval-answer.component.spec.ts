import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEvalAnswerComponent } from './student-eval-answer.component';

describe('StudentEvalAnswerComponent', () => {
  let component: StudentEvalAnswerComponent;
  let fixture: ComponentFixture<StudentEvalAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentEvalAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEvalAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
