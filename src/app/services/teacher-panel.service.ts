import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeacherPanelService {
  subscribe(arg0: (res: any) => void) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  getQuestionNumberList(data: any) {
    return this.http.post(`${environment.baseurl}question_number_list`, data);
  }

  getQuestionTypeList(data: any) {
    return this.http.post(`${environment.baseurl}question_type_list`, data);
  }

  getQuestionPartList(data: any) {
    return this.http.post(`${environment.baseurl}question_part_list`, data);
  }

  getQuestionMarkList(data: any) {
    return this.http.post(`${environment.baseurl}question_mark_list`, data);
  }

  getAddSubjectQuestion(data: any) {
    return this.http.post(`${environment.baseurl}add_subject_question`, data);
  }

  getTeacherQueList(data: any) {
    return this.http.post(
      `${environment.baseurl}get_teacher_dashboard_list`,
      data
    );
  }

  getTeacherCreateQueList(data: any) {
    return this.http.post(
      `${environment.baseurl}get_teacher_create_question_list`,
      data
    );
  }

  editTeacherCreateQueList(data: any) {
    return this.http.post(
      `${environment.baseurl}fetch_create_question_list_for_edit`,data);}

  updateTeacherCreateQueList(data: any) {
    return this.http.post(
      `${environment.baseurl}update_subject_data`,
      data
    );
  }

  deleteTeacherCreateQueList(data: any) {
    return this.http.post(
      `${environment.baseurl}delete_subject_data`,
      data
    );
  }

  getQuesPaperManage(data: any) {
    return this.http.post(
      `${environment.baseurl}question_paper_managment_list`,
      data
    );
  }

  getAssignedAns() {
    return this.http.get(
      `${environment.baseurl}get_assigned_teacher_list

      `
    );
  }

  getAnsSheets(data: any) {
    return this.http.post(
      `${environment.baseurl}get_answersheet_data_by_id`,
      data
    );
  }

changeTeacherPassword(data: any) {
  return this.http.post(
    `${environment.baseurl}change_teacher_password`,
    data
  );
}
}