import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExaminerPanelService } from 'src/app/services/examiner-panel.service';
import { DatePipe } from '@angular/common';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidatorFn } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
// import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-examiner-form',
  templateUrl: './examiner-form.component.html',
  styleUrls: ['./examiner-form.component.css'],
})
export class ExaminerFormComponent implements OnInit {
  displayedColumns: string[] = [
    'subject_name',
    'total_mark',
    'pass_mark',
    'exam_date',
    'question_paper_name',
    'answer_paper_name',
    'Action',
  ];

  addexam: any;
  addsubject: any;
  examinerclassListData: any;
  examinerclassList: any;
  data: any;
  examinerAcademicYearListData: any;
  examinerAcademicYearList: any;
  examinerSemesterListData: any;
  examinerSemesterList: any;
  examinerDivisionListData: any;
  examinerDivisionList: any;
  date1: any;
  date2: any;
  date3: any;
  exam_name: any;
  examinerQuestionPaperListData: any;
  examinerQuestionPaperList: any;
  examinerAnswerPaperListData: any;
  examinerAnswerPaperList: any;
  examinerExamListData: any;
  examinerExamPaperList: any;
  dataSource: any;
  length: any;
  pageIndex: any;
  pageSize = 11;
  minDate: Date;
  maxDate: Date;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  role: any;
  time: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _examiner_panel: ExaminerPanelService,
    public datepipe: DatePipe,
    private _snackBar: MatSnackBar
  ) {
    const today = new Date();
    this.minDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    this.maxDate = new Date(today.getFullYear(), 11, 31);
  }

  ngOnInit(): void {
    this.loadForm();
    this.getExaminerClassList();
    this.getExaminerAcademicYearList();
    this.getExaminerSemesterList();
    this.getExaminerDivisionList();
    this.getExaminerQuestionPaperList();
    this.getExaminerAnswerPaperList();
    this.getExaminerExamList();
    this.role = localStorage.getItem('role');
    // console.log(this.role);
  }

  navigateDashboard() {
    this.router.navigate(['/admin/admin/app-exam-management']);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  getExaminerClassList() {
    this._examiner_panel.getClassList(this.data).subscribe((res) => {
      this.examinerclassListData = res;
      this.examinerclassList = this.examinerclassListData.data;
      // console.log(this.examinerclassList);
    });
  }

  getExaminerAcademicYearList() {
    this._examiner_panel.getAcademicYearList(this.data).subscribe((res) => {
      this.examinerAcademicYearListData = res;
      this.examinerAcademicYearList = this.examinerAcademicYearListData.data;
      // console.log(this.examinerAcademicYearList);
    });
  }

  getExaminerSemesterList() {
    this._examiner_panel.getSemesterList(this.data).subscribe((res) => {
      this.examinerSemesterListData = res;
      this.examinerSemesterList = this.examinerSemesterListData.data;
      // console.log(this.examinerSemesterList);
    });
  }

  getExaminerDivisionList() {
    this._examiner_panel.getDivisionList(this.data).subscribe((res) => {
      this.examinerDivisionListData = res;
      this.examinerDivisionList = this.examinerDivisionListData.data;
      // console.log(this.examinerDivisionList);
    });
  }

  getExaminerQuestionPaperList() {
    this._examiner_panel.getQuestionPaperList(this.data).subscribe((res) => {
      this.examinerQuestionPaperListData = res;
      this.examinerQuestionPaperList = this.examinerQuestionPaperListData.data;
      // console.log(this.examinerQuestionPaperList);
    });
  }

  getExaminerAnswerPaperList() {
    this._examiner_panel.getAnswerPaperList(this.data).subscribe((res) => {
      this.examinerAnswerPaperListData = res;
      this.examinerAnswerPaperList = this.examinerAnswerPaperListData.data;
      // console.log(this.examinerAnswerPaperList);
    });
  }

  getExaminerExamList() {
    this._examiner_panel.getExamList(this.data).subscribe((res) => {
      this.examinerExamListData = res;
      this.examinerExamPaperList = this.examinerExamListData.data;
      this.dataSource = new MatTableDataSource(this.examinerExamPaperList);
      this.length = this.examinerExamPaperList.length;
      // console.log(this.length);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      setTimeout(() => {
        this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.length;
      });
      // console.log(this.examinerExamPaperList);
      // console.log(this.dataSource);
    });
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.getExaminerExamList();
  }

  examDateRangeValidator(
    examStartDateControlName: 'exam_start_date',
    examEndDateControlName: 'exam_end_date'
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const examStartDateControl = control.get(examStartDateControlName);
      const examEndDateControl = control.get(examEndDateControlName);

      if (
        examStartDateControl?.value &&
        examEndDateControl?.value &&
        examStartDateControl.value > examEndDateControl.value
      ) {
        examEndDateControl.setErrors({ dateRange: true });
        return { dateRange: true };
      }

      return null;
    };
  }

  // onlyDateFilter = (date: Date) => {
  //   const day = date.getUTCDay();
  //   return day === 0 || day === 6;
  // }

  loadForm() {
    this.addexam = this.fb.group(
      {
        exam_name: ['', Validators.compose([Validators.required])],
        class: ['', Validators.compose([Validators.required])],
        division: ['', Validators.compose([Validators.required])],
        academic_year: ['', Validators.compose([Validators.required])],
        semester: ['', Validators.compose([Validators.required])],
        exam_start_date: ['', Validators.compose([Validators.required])],
        exam_end_date: ['', Validators.compose([Validators.required])],
        // exam_start_date: ['', Validators.compose([Validators.required])],
        subject_name: ['', Validators.compose([Validators.required])],
        total_marks: ['', Validators.compose([Validators.required])],
        pass_marks: ['', Validators.compose([Validators.required])],
        exam_date: ['', Validators.compose([Validators.required])],
        que_paper: ['', Validators.compose([Validators.required])],
        ideal_ans_paper: ['', Validators.compose([Validators.required])],
        exam_time: ['', Validators.compose([Validators.required])],
      },
      {
        validators: this.examDateRangeValidator(
          'exam_start_date',
          'exam_end_date'
        ),
      }
    );
  }

  onSubmit() {
    const formData = new FormData();
    let getDatePicker1 = this.addexam.value.exam_start_date;
    let getDatePicker2 = this.addexam.value.exam_end_date;
    let getDatePicker3 = this.addexam.value.exam_date;
    //let dateFormat1 = this.datepipe.transform(getDatePicker1, 'dd-MM-yyyy');
    let dateFormat1 = this.datepipe.transform(getDatePicker1, 'yyyy-MM-dd');
    this.date1 = dateFormat1;
    let dateFormat2 = this.datepipe.transform(getDatePicker2, 'yyyy-MM-dd');
    this.date2 = dateFormat2;

    let dateFormat3 = this.datepipe.transform(getDatePicker3, 'yyyy-MM-dd');
    this.date3 = dateFormat3;

    const time = new Date(`1/1/2022 ${this.addexam.value.exam_time}`);
    const timeString = time.toLocaleTimeString([], {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    this.time = timeString;
    // console.log(this.time);
    let subjectList = [
      {
        subject_name: this.addexam.value.subject_name,
        total_mark: this.addexam.value.total_marks,
        pass_mark: this.addexam.value.pass_marks,
        exam_date: this.date3,
        select_question_paper_id: this.addexam.value.que_paper,
        select_answer_paper_id: this.addexam.value.ideal_ans_paper,
        exam_time: this.time,
      },
    ];

    formData.append('role_id', this.role);
    formData.append('exam_name', this.addexam.value.exam_name);
    console.log(this.exam_name);
    formData.append('class_id', this.addexam.value.class);
    formData.append('division_id', this.addexam.value.division);
    formData.append('academic_year_id', this.addexam.value.academic_year);
    formData.append('semister_id', this.addexam.value.semester);
    formData.append('exam_start_date', this.date1);
    formData.append('exam_end_date', this.date2);
    formData.append('subject_list', JSON.stringify(subjectList));

    this._examiner_panel.addExam(formData).subscribe((res) => {
      this.data = res;
      this.openSnackBar('Exam Added Successfully!', 'dismiss');
      this.getExaminerExamList();
      this.router.navigate(['./examiner/examiner/app-exam-management']);
      // console.log(res);
      // console.log(this.data);
    });
    // console.log(formData);
  }
}
