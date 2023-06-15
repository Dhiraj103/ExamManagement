import { TestBed } from '@angular/core/testing';

import { ExaminerPanelService } from './examiner-panel.service';

describe('ExaminerPanelService', () => {
  let service: ExaminerPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExaminerPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
