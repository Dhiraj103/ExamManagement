import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerProfileComponent } from './scanner-profile.component';

describe('ScannerProfileComponent', () => {
  let component: ScannerProfileComponent;
  let fixture: ComponentFixture<ScannerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannerProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
