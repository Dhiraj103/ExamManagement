import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherQuesManagementComponent } from './teacher-ques-management.component';

describe('TeacherQuesManagementComponent', () => {
  let component: TeacherQuesManagementComponent;
  let fixture: ComponentFixture<TeacherQuesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherQuesManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherQuesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
