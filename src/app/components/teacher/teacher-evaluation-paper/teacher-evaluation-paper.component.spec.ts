import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEvaluationPaperComponent } from './teacher-evaluation-paper.component';

describe('TeacherEvaluationPaperComponent', () => {
  let component: TeacherEvaluationPaperComponent;
  let fixture: ComponentFixture<TeacherEvaluationPaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherEvaluationPaperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherEvaluationPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
