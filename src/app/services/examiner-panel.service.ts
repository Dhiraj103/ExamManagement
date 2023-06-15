import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExaminerPanelService {
  subscribe(arg0: (res: any) => void) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

  getClassList(data: any) {
    return this.http.post(`${environment.baseurl}class_list`, data);
  }

  getDivisionList(data: any) {
    return this.http.post(`${environment.baseurl}division_list`, data);
  }

  getAcademicYearList(data: any) {
    return this.http.post(`${environment.baseurl}academic_year_list`, data);
  }

  getSemesterList(data: any) {
    return this.http.post(`${environment.baseurl}semester_list`, data);
  }

  getQuestionPaperList(data: any) {
    return this.http.post(`${environment.baseurl}question_paper_list`, data);
  }

  getAnswerPaperList(data: any) {
    return this.http.post(`${environment.baseurl}answer_paper_list`, data);
  }

  addExam(data: any) {
    return this.http.post(`${environment.baseurl}add_exam`, data);
  }

  getExamList(data: any) {
    return this.http.post(`${environment.baseurl}exam_details`, data);
  }

  deleteExam(data: any) {
    return this.http.post(`${environment.baseurl}delete_exam_data`, data);
  }

  updateExam(data: any) {
    return this.http.post(`${environment.baseurl}update_exam_data`, data);
  }
  fetchExamData(data: any) {
    return this.http.post(`${environment.baseurl}fetch_edit_exam_data`, data);
  }
  fetchCreateExamId(data: any) {
    return this.http.post(
      `${environment.baseurl}get_create_exam_id
    `,
      data
    );
  }

  sendFolderToTeacher(data: any) {
    return this.http.post(
      `${environment.baseurl}assign_teacher_to_asheet
    `,
      data
    );
  }

  getSentExaminerAnsList(data: any) {
    return this.http.get(
      `${environment.baseurl}get_assigned_examiner_list
    `,
      data
    );
  }
}
