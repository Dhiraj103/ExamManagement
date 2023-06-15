import { TestBed } from '@angular/core/testing';

import { TeacherPanelService } from './teacher-panel.service';

describe('TeacherPanelService', () => {
  let service: TeacherPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
