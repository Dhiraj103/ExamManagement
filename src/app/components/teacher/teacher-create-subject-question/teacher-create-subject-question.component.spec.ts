import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCreateSubjectQuestionComponent } from './teacher-create-subject-question.component';

describe('TeacherCreateSubjectQuestionComponent', () => {
  let component: TeacherCreateSubjectQuestionComponent;
  let fixture: ComponentFixture<TeacherCreateSubjectQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherCreateSubjectQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCreateSubjectQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
