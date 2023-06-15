import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEvalPaperComponent } from './student-eval-paper.component';

describe('StudentEvalPaperComponent', () => {
  let component: StudentEvalPaperComponent;
  let fixture: ComponentFixture<StudentEvalPaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentEvalPaperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEvalPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
