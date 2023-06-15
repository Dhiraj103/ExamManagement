import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScannerComponent } from './edit-scanner.component';

describe('EditScannerComponent', () => {
  let component: EditScannerComponent;
  let fixture: ComponentFixture<EditScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditScannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
