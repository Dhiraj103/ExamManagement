import { TestBed } from '@angular/core/testing';

import { AdminStudentService } from './admin-student.service';

describe('AdminStudentService', () => {
  let service: AdminStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
