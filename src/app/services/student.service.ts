import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudentList(data:any){
    return this.http.post(`${environment.baseurl}add_student_data`,data);
  }

  ChangeStudentPassword(data:any){
    return this.http.post(`${environment.baseurl}change_student_password`,data);
  }

  fetchStudentData(data:any){
    return this.http.post(`${environment.baseurl}fetch_student_profile`,data);
  }
}
