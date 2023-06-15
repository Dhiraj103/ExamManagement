import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEvaluationOneComponent } from './teacher-evaluation-one.component';

describe('TeacherEvaluationOneComponent', () => {
  let component: TeacherEvaluationOneComponent;
  let fixture: ComponentFixture<TeacherEvaluationOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherEvaluationOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherEvaluationOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
