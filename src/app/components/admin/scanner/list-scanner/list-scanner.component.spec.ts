import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListScannerComponent } from './list-scanner.component';

describe('ListScannerComponent', () => {
  let component: ListScannerComponent;
  let fixture: ComponentFixture<ListScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListScannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
