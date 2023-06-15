import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExaminerComponent } from './edit-examiner.component';

describe('EditExaminerComponent', () => {
  let component: EditExaminerComponent;
  let fixture: ComponentFixture<EditExaminerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExaminerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExaminerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
