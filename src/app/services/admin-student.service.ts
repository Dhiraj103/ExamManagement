import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminStudentService {
  constructor(private http: HttpClient) {}

  addStudent(data: any) {
    return this.http.post(`${environment.baseurl}add_student`, data);
  }

  updateStudent(data: any) {
    return this.http.post(
      `${environment.baseurl}update_student
    `,
      data
    );
  }

  fetchStudentData(data: any) {
    return this.http.post(
      `${environment.baseurl}fetch_student_profile

    `,
      data
    );
  }
}
