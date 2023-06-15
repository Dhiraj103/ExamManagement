import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { ExaminerPanelService } from 'src/app/services/examiner-panel.service';

import { AbstractControl, Validators } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.css'],
})
export class EditExamComponent implements OnInit {
  displayedColumns: string[] = [
    'subject_name',
    'total_mark',
    'pass_mark',
    'exam_date',
    'question_paper_name',
    'answer_paper_name',
    'Action',
  ];

  editExam: any;
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
  //

  //
  dataSource: any;
  length: any;
  pageIndex: any;
  pageSize = 10;
  editExamId: any;
  createExamId: any;
  minDate: Date;
  maxDate: Date;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  result: any;
  listres: any;
  listresData: any;
  resData: any;
  resDataList: any;
  examName: any;
  classId: any;
  divisionId: any;
  subjectName: any;
  examtime: any;
  ansPaperId: any;
  quePaperId: any;
  passMark: any;
  totalMark: any;
  semesterId: any;
  academicYearId: any;
  time: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _examiner_panel: ExaminerPanelService,
    public datepipe: DatePipe,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
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
    this.editExamId = this.route.snapshot.params.id;
    this.getExaminerClassList();
    this.getExaminerAcademicYearList();
    this.getExaminerSemesterList();
    this.getExaminerDivisionList();
    this.getExaminerQuestionPaperList();
    this.getExaminerAnswerPaperList();
    this.getList();
    // console.log(this.examinerExamPaperList);
    // this.editExamDetails()
    this.getExaminerExamList();
    // this.editExamDetails(this.data);

    // this.getCreateId();
    // this.createExamId = this.listresData[0].create_exam_id;
  }

  navigateDashboard() {
    this.router.navigate(['./examiner/examiner/app-exam-management']);
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

  getList() {
    this._examiner_panel.getExamList(this.data).subscribe((res) => {
      // console.log(res);
      this.listres = res;
      this.listresData = this.listres.data;
      // this.createExamId = this.listresData[0].create_exam_id;
      // console.log(this.createExamId);

      // console.log(this.listresData[].create_exam_id);
    });
  }

  getCreateId() {
    const formData = new FormData();
    formData.append('exam_details_id', this.editExamId);
    // console.log(this.editExamId);

    this._examiner_panel.fetchCreateExamId(formData).subscribe((res) => {
      // console.log(res);
      this.resData = res;
      this.resDataList = this.resData.data[0];
      this.createExamId = this.resDataList.create_exam_id;
      // console.log(this.createExamId);
      // this.getExaminerExamList(this.createExamId);
    });
  }

  getExaminerExamList() {
    const formData = new FormData();
    formData.append('exam_details_id', this.editExamId);
    // console.log(this.editExamId);

    this._examiner_panel.fetchCreateExamId(formData).subscribe((res) => {
      // console.log(res);
      this.resData = res;
      this.resDataList = this.resData.data[0];
      this.createExamId = this.resDataList.create_exam_id;
      // console.log(this.createExamId);

      formData.append('create_exam_id', this.createExamId);
      // console.log(this.createExamId);
      formData.append('exam_details_id', this.editExamId);
      // console.log(this.editExamId);

      this._examiner_panel.fetchExamData(formData).subscribe((res) => {
        // this.examinerExamListData = res;
        this.result = res;
        this.examinerExamPaperList = this.result.data;

        // console.log(this.examinerExamPaperList);
        this.editExamDetails(this.examinerExamPaperList[0]);

        this.dataSource = new MatTableDataSource(this.examinerExamPaperList);
        this.length = this.examinerExamPaperList.length;
        // console.log(this.length);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        setTimeout(() => {
          this.paginator.pageIndex = this.pageIndex;
          this.paginator.length = this.length;
        });
        // console.log(this.dataSource);
      });
      // this.getExaminerExamList(this.createExamId);
    });
    // console.log(this.createExamId);
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.getExaminerExamList();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3500,
    });
  }

  editExamDetails(data: any) {
    // console.log(data);
    let timeVal = data.exam_time;
    let timeCon = new Date('1/1/2022 ' + timeVal).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
    this.time = timeCon;
    // console.log(this.time);

    this.editExam = this.fb.group(
      {
        exam_name: [data.exam_name, Validators.compose([Validators.required])],
        class: [data.class_id, Validators.compose([Validators.required])],
        division: [data.division_id, Validators.compose([Validators.required])],

        academic_year: [
          data.academic_year_id,
          Validators.compose([Validators.required]),
        ],
        semester: [data.semister_id, Validators.compose([Validators.required])],
        exam_start_date: [
          data.exam_start_date,
          Validators.compose([Validators.required]),
        ],
        exam_end_date: [
          data.exam_end_date,
          Validators.compose([Validators.required]),
        ],
        // exam_start_date: ['', Validators.compose([Validators.required])],
        subject_name: [
          data.subject_name,
          Validators.compose([Validators.required]),
        ],
        total_marks: [
          data.total_mark,
          Validators.compose([Validators.required]),
        ],
        pass_marks: [data.pass_mark, Validators.compose([Validators.required])],
        exam_date: [data.exam_date, Validators.compose([Validators.required])],
        que_paper: [
          data.select_question_paper_id,
          Validators.compose([Validators.required]),
        ],
        ideal_ans_paper: [
          data.select_answer_paper_id,
          Validators.compose([Validators.required]),
        ],
        exam_time: [this.time, Validators.compose([Validators.required])],
      },

      {
        validators: this.examDateRangeValidator(
          'exam_start_date',
          'exam_end_date'
        ),
      }
    );
    // console.log(this.editExam);
  }

  addExam() {}

  onSubmit() {
    // console.log('clicked');
    const formData = new FormData();
    let getDatePicker1 = this.editExam.value.exam_start_date;
    let getDatePicker2 = this.editExam.value.exam_end_date;
    let getDatePicker3 = this.editExam.value.exam_date;
    // console.log(getDatePicker1);
    // console.log(getDatePicker2);
    // console.log(getDatePicker3);
    //let dateFormat1 = this.datepipe.transform(getDatePicker1, 'dd-MM-yyyy');
    let dateFormat1 = this.datepipe.transform(getDatePicker1, 'yyyy-MM-dd');
    this.date1 = dateFormat1;
    let dateFormat2 = this.datepipe.transform(getDatePicker2, 'yyyy-MM-dd');
    this.date2 = dateFormat2;

    let dateFormat3 = this.datepipe.transform(getDatePicker3, 'yyyy-MM-dd');
    this.date3 = dateFormat3;
    const time = new Date(`1/1/2022 ${this.editExam.value.exam_time}`);
    const timeString = time.toLocaleTimeString([], {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    this.time = timeString;
    // let subjectList = [
    //   {
    //     subject_name: this.editExam.value.subject_name,
    //     total_mark: this.editExam.value.total_marks,
    //     pass_mark: this.editExam.value.pass_marks,
    //     exam_date: this.date3,
    //     select_question_paper_id: this.editExam.value.que_paper,
    //     select_answer_paper_id: this.editExam.value.ideal_ans_paper,
    //     exam_time: this.editExam.value.exam_time,
    //   },
    // ];

    this.examName = this.editExam.value.exam_name;
    this.classId = this.editExam.value.class;
    this.divisionId = this.editExam.value.division;
    this.subjectName = this.editExam.value.subject_name;
    this.academicYearId = this.editExam.value.academic_year;
    this.semesterId = this.editExam.value.semester;
    this.totalMark = this.editExam.value.total_marks;
    this.passMark = this.editExam.value.pass_marks;
    this.quePaperId = this.editExam.value.que_paper;
    this.ansPaperId = this.editExam.value.ideal_ans_paper;
    this.examtime = this.time;

    // console.log(this.examName);
    // console.log(this.classId);
    // console.log(this.divisionId);
    // console.log(this.subjectName);
    // console.log(this.academicYearId);
    // console.log(this.semesterId);
    // console.log(this.totalMark);
    // console.log(this.passMark);
    // console.log(this.quePaperId);
    // console.log(this.ansPaperId);
    // console.log(this.examtime);
    formData.append('exam_details_id', this.editExamId);
    console.log(this.editExamId);
    formData.append('exam_name', this.examName);
    // console.log(this.editExam.value.exam_name);
    formData.append('class_id', this.classId);
    formData.append('division_id', this.divisionId);
    formData.append('subject_name', this.subjectName);
    formData.append('academic_year_id', this.academicYearId);
    formData.append('semister_id', this.semesterId);
    formData.append('exam_date', this.date3);
    formData.append('exam_start_date', this.date1);
    formData.append('exam_end_date', this.date2);
    formData.append('total_mark', this.totalMark);
    formData.append('pass_mark', this.passMark);
    formData.append('select_question_paper_id', this.quePaperId);
    formData.append('select_answer_paper_id', this.ansPaperId);
    formData.append('exam_time', this.examtime);
    // formData.append('subject_list', JSON.stringify(subjectList));

    this._examiner_panel.updateExam(formData).subscribe((res) => {
      this.data = res;
      if ((res = this.data.success)) {
        this.openSnackBar('Exam Updated Successfully!', 'dismiss');
        this.getExaminerExamList();
        this.navigateDashboard();
      }

      // console.log(res);
      // console.log(this.data);
    });
    // console.log(formData);
  }
}
