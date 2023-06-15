import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExaminerComponent } from './manage-examiner.component';

describe('ManageExaminerComponent', () => {
  let component: ManageExaminerComponent;
  let fixture: ComponentFixture<ManageExaminerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageExaminerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageExaminerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
