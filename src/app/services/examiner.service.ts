import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExaminerService {

  constructor(private http:HttpClient) { }

  getExaminerList(data:any){
    return this.http.post(`${environment.baseurl}get_examiner_list`,data);
  }

  saveExaminer(data:any){
    return this.http.post(`${environment.baseurl}add_examiner`,data);
  }

  editExaminer(data:any){
    return this.http.post(`${environment.baseurl}get_examiner`,data);
  }

  updateExaminer(data:any){
    return this.http.post(`${environment.baseurl}update_examiner`,data);
  }
  
  changeExaminerPassword(data: any) {
    return this.http.post(
      `${environment.baseurl}change_teacher_password`,
      data
    );
  }
}
