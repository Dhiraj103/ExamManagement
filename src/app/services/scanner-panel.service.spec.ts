import { TestBed } from '@angular/core/testing';

import { ScannerPanelService } from './scanner-panel.service';

describe('ScannerPanelService', () => {
  let service: ScannerPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScannerPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
