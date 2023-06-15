import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScannerComponent } from './add-scanner.component';

describe('AddScannerComponent', () => {
  let component: AddScannerComponent;
  let fixture: ComponentFixture<AddScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
