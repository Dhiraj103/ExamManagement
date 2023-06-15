import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherPanelService } from 'src/app/services/teacher-panel.service';

@Component({
  selector: 'app-teacher-create-subject-question',
  templateUrl: './teacher-create-subject-question.component.html',
  styleUrls: ['./teacher-create-subject-question.component.css'],
})
export class TeacherCreateSubjectQuestionComponent implements OnInit {
  selectedAnswer: boolean = false;
  showInput = false;
  inputFields = [{ value: '' }];
  TeacherQuestionTypeList = [
    { id: 1, question_type: 'Type 1' },
    { id: 2, question_type: 'Type 2' },
    { id: 3, question_type: 'Type 3' },
  ];
  // form: FormGroup;
  // formArray: FormArray;
  formGroup = new FormGroup({
    answerOne: new FormControl(''),
  });
  createSubjectQuestion: any;
  dataSource: any;
  length: any;
  pageIndex: any;
  pageSize = 10;
  displayedColumns: string[] = [
    'que_num',
    'que_type',
    'que_part',
    'que',
    'ans',
    'marks',
    'Action',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  teacherqueListData: any;
  teacherqueList: any;
  role: any;
  TeacherQuestionMarkListData: any;
  TeacherQuestionMarkList: any;
  TeacherQuestionPartListData: any;
  TeacherQuestionPartList: any;
  TeacherQuestionTypeListData: any;
  // TeacherQuestionTypeList: any;
  TeacherQuestionNumberListData: any;
  TeacherQuestionNumberList: any;
  createQuesId: any;
  examSubjectId: any;
  editData: any;
  editDataList: any;
  editDataList2: any;
  isUpdate: boolean = false;
  subjectDetailId: any;
  selectedAns: any;
  multiOneCorrect: any;
  isMultiOneCorrect = 0;
  isMultiTwoCorrect = 0;
  isMultiThreeCorrect = 0;
  isMultiFourCorrect = 0;
  quesId: any = 0;
  teacher_id: any;
  CreateSubjectId: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private teacherPanel: TeacherPanelService
  ) {}

  ngOnInit(): void {
    this.getTeacherQuestionNumberList();
    this.getTeacherQuestionTypeList();
    this.getTeacherQuestionPartList();
    this.getTeacherQuestionMarkList();
    this.loadForm();
    this.getTeacherQueList();
    this.teacher_id = localStorage.getItem('user_id');
    this.CreateSubjectId = this.route.snapshot.params.id;
    console.log(this.CreateSubjectId);
  }

  getTeacherQuestionNumberList() {
    this.teacherPanel.getQuestionNumberList(this.data).subscribe((res) => {
      this.TeacherQuestionNumberListData = res;
      this.TeacherQuestionNumberList = this.TeacherQuestionNumberListData.data;
      // console.log(this.TeacherQuestionNumberList);
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3500,
    });
  }

  navigateQuesDash() {
    this.router.navigate(['./teacher/teacher/app-teacher-ques-management']);
  }
  getTeacherQuestionTypeList() {
    this.teacherPanel.getQuestionTypeList(this.data).subscribe((res) => {
      this.TeacherQuestionTypeListData = res;
      this.TeacherQuestionTypeList = this.TeacherQuestionTypeListData.data;
      // console.log(this.TeacherQuestionTypeList);
    });
  }

  getTeacherQuestionPartList() {
    this.teacherPanel.getQuestionPartList(this.data).subscribe((res) => {
      this.TeacherQuestionPartListData = res;
      this.TeacherQuestionPartList = this.TeacherQuestionPartListData.data;
      // console.log(this.TeacherQuestionPartList);
    });
  }

  getTeacherQuestionMarkList() {
    this.teacherPanel.getQuestionMarkList(this.data).subscribe((res) => {
      this.TeacherQuestionMarkListData = res;
      this.TeacherQuestionMarkList = this.TeacherQuestionMarkListData.data;
      // console.log(this.TeacherQuestionMarkList);
    });
  }

  // Add code here
  onQueTypeChange(event: { value: number }) {
    if (event.value == 1) {
      this.showInput = true;
    } else {
      this.showInput = false;
    }
  }

  onChangeMultiOneCorrect(event: Event) {
    const elementOne = event.target as HTMLInputElement;
    this.isMultiOneCorrect = elementOne.checked ? 1 : 0;
  }

  onChangeMultiTwoCorrect(event: Event) {
    const elementTwo = event.target as HTMLInputElement;
    this.isMultiTwoCorrect = elementTwo.checked ? 1 : 0;
  }
  onChangeMultiThreeCorrect(event: Event) {
    const elementThree = event.target as HTMLInputElement;
    this.isMultiThreeCorrect = elementThree.checked ? 1 : 0;
  }
  onChangeMultiFourCorrect(event: Event) {
    const elementFour = event.target as HTMLInputElement;
    this.isMultiFourCorrect = elementFour.checked ? 1 : 0;
  }

  addInputField() {
    this.inputFields.push({ value: '' });
  }

  deleteInputField(index: number) {
    this.inputFields.splice(index, 1);
  }
  addNewAns() {
    const newControl = new FormControl('');
    this.formGroup.addControl(
      'answer' + (Object.keys(this.formGroup.controls).length + 1),
      newControl
    );
    // console.log('clicked');
  }

  getTeacherQueList() {
    const formData = new FormData();

    this.role = localStorage.getItem('role');

    this.createQuesId = this.route.snapshot.params.id;

    formData.append('CreateSubject_id', this.createQuesId);
    // formData.append('question_type_id', this.quesId);

    // formData.append('CreateSubject_id', this.createQuesId);
    this.teacherPanel.getTeacherCreateQueList(formData).subscribe((res) => {
      this.teacherqueListData = res;
      this.teacherqueList = this.teacherqueListData.data;
      console.log(this.teacherqueList);
      this.dataSource = new MatTableDataSource(this.teacherqueList);
      this.length = this.teacherqueList.length;
      // console.log(this.length);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      setTimeout(() => {
        this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.length;
      });
      // console.log(this.teacherqueList);
      // console.log(this.dataSource);
    });
  }
  data(data: any) {
    throw new Error('Method not implemented.');
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.getTeacherQueList();
  }

  editQue(subject_details_id: any) {
    this.subjectDetailId = subject_details_id;
    const formData = new FormData();
    // console.log(subject_details_id);
    this.subjectDetailId = subject_details_id;
    let CreateSubjectId = this.route.snapshot.params.id;
    formData.append('subject_details_id', subject_details_id);
    formData.append('CreateSubject_id', CreateSubjectId);
    this.teacherPanel.editTeacherCreateQueList(formData).subscribe((res) => {
      // console.log(res);
      this.editData = res;
      this.editDataList = this.editData.data;
      this.editDataList2 = this.editData.data[0];
      this.createSubjectQuestion = this.fb.group({
        queNumber: this.editDataList[0].question_number_id,
        queType: this.editDataList[0].question_type_id,
        quePart: this.editDataList[0].question_part_id,
        questions: this.editDataList[0].question,
        queMark: this.editDataList[0].question_mark_id,
        ansOne: this.editDataList[0].ideal_answer,
        answerSecond: this.editDataList[0].ideal_answer_status,
      });

      if (this.editDataList[0].question_type_id == 1) {
        this.showInput = true;
        this.createSubjectQuestion = this.fb.group({
          queNumber: this.editDataList[0].question_number_id,
          queType: this.editDataList[0].question_type_id,
          quePart: this.editDataList[0].question_part_id,
          questions: this.editDataList[0].question,
          queMark: this.editDataList[0].question_mark_id,
          multiOne: this.editDataList[0].ideal_ans1,
          multiTwo: this.editDataList[0].ideal_ans2,
          multiThree: this.editDataList[0].ideal_ans3,
          multiFour: this.editDataList[0].ideal_ans4,
        });
      } else {
        this.showInput = false;
      }
    });
  }

  onEdit() {
    const formData = new FormData();
    const ansOneValue: any = this.isMultiOneCorrect ? 1 : 0;
    const ansTwoValue: any = this.isMultiTwoCorrect ? 1 : 0;
    const ansThreeValue: any = this.isMultiThreeCorrect ? 1 : 0;
    const ansFourValue: any = this.isMultiFourCorrect ? 1 : 0;

    let IdealAnsStatus: any = this.selectedAnswer ? 1 : 0;
    console.log(this.CreateSubjectId);
    formData.append('subject_details_id', this.subjectDetailId);
    formData.append(
      'question_number_id',
      this.createSubjectQuestion.value.queNumber
    );
    formData.append(
      'question_type_id',
      this.createSubjectQuestion.value.queType
    );

    formData.append(
      'question_part_id',
      this.createSubjectQuestion.value.quePart
    );
    formData.append(
      'question_mark_id',
      this.createSubjectQuestion.value.queMark
    );

    formData.append('question', this.createSubjectQuestion.value.questions);
    formData.append('ideal_answer', this.createSubjectQuestion.value.ansOne);
    formData.append('ideal_answer_status', IdealAnsStatus);
    formData.append('ideal_ans1', this.createSubjectQuestion.value.multiOne);
    formData.append('ideal_ans1_status', ansOneValue);
    formData.append('ideal_ans2', this.createSubjectQuestion.value.multiTwo);
    formData.append('ideal_ans2_status', ansTwoValue);
    formData.append('ideal_ans3', this.createSubjectQuestion.value.multiThree);
    formData.append('ideal_ans3_status', ansThreeValue);
    formData.append('ideal_ans4', this.createSubjectQuestion.value.multiFour);
    formData.append('ideal_ans4_status', ansFourValue);
    formData.append('teacher_id', this.teacher_id);

    this.teacherPanel.updateTeacherCreateQueList(formData).subscribe((res) => {
      console.log(res);
      this.openSnackBar('Question Updated Successfully!', 'dismiss');
      this.getTeacherQueList();
    });
  }

  deleteQue(subject_details_id: any) {
    const formData = new FormData();
    // console.log(subject_details_id);
    formData.append('subject_details_id', subject_details_id);
    this.teacherPanel.deleteTeacherCreateQueList(formData).subscribe((res) => {
      // console.log(res);
      this.openSnackBar('Question Deleted Successfully!', 'dismiss');
      this.getTeacherQueList();
    });
  }

  loadForm() {
    this.createSubjectQuestion = this.fb.group({
      queNumber: ['', Validators.compose([Validators.required])],
      queType: ['', Validators.compose([Validators.required])],
      quePart: ['', Validators.compose([Validators.required])],
      question: ['', Validators.compose([Validators.required])],
      queMark: ['', Validators.compose([Validators.required])],
      questions: ['', Validators.compose([Validators.required])],
      ansOne: ['', Validators.compose([Validators.required])],
      // answerSecond: ['', Validators.compose([Validators.required])],
      multiOne: ['', Validators.compose([Validators.required])],
      multiTwo: ['', Validators.compose([Validators.required])],
      multiThree: ['', Validators.compose([Validators.required])],
      multiFour: ['', Validators.compose([Validators.required])],
    });
  }

  clearForm() {
    this.loadForm();
    this.editDataList = false;
  }

  downloadPdf() {
    const institute_id = localStorage.getItem('instituteId')
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute(
      'href',
      `http://exam.ezii.live/index.php/api/pdf_generate/${this.CreateSubjectId}/${institute_id}`
    );
    link.setAttribute('download', `SampleQuestion.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    // console.log(row);
  }

  onSubmit() {
    const ansOneValue: any = this.isMultiOneCorrect ? 1 : 0;
    const ansTwoValue: any = this.isMultiTwoCorrect ? 1 : 0;
    const ansThreeValue: any = this.isMultiThreeCorrect ? 1 : 0;
    const ansFourValue: any = this.isMultiFourCorrect ? 1 : 0;
    // console.log(ansOneValue);
    const formData = new FormData();

    // let multiple = [
    //   {
    //     ideal_answer_one: this.createSubjectQuestion.value.multiOne,
    //     ideal_answer_status_one: ansOneValue,
    //   },
    //   {
    //     ideal_answer_two: this.createSubjectQuestion.value.multiTwo,
    //     ideal_answers_status_two: ansTwoValue,
    //   },
    //   {
    //     ideal_answer_three: this.createSubjectQuestion.value.multiThree,
    //     ideal_answer_status_three: ansThreeValue,
    //   },
    //   {
    //     ideal_answer_four: this.createSubjectQuestion.value.multiFour,
    //     ideal_answer_status_four: ansFourValue,
    //   },
    // ];
    let CreateSubjectId = this.route.snapshot.params.id;
    // console.log(CreateSubjectId);
    // let subjectList = [
    //   {
    //     create_subject_id: CreateSubjectId,
    //     question_number_id: this.createSubjectQuestion.value.queNumber,
    //     question_type_id: this.createSubjectQuestion.value.queType,
    //     question_part_id: this.createSubjectQuestion.value.quePart,
    //     question_mark_id: this.createSubjectQuestion.value.queMark,
    //     question: this.createSubjectQuestion.value.questions,
    //     ideal_answer: this.createSubjectQuestion.value.ansOne,
    //     ideal_answer_status: this.selectedAnswer ? 1 : 0,
    //     multiple: multiple,
    //   },
    // ];

    let IdealAnsStatus: any = this.selectedAnswer ? 1 : 0;

    formData.append(
      'question_number_id',
      this.createSubjectQuestion.value.queNumber
    );
    formData.append(
      'question_type_id',
      this.createSubjectQuestion.value.queType
    );
    formData.append(
      'question_part_id',
      this.createSubjectQuestion.value.quePart
    );
    formData.append(
      'question_mark_id',
      this.createSubjectQuestion.value.queMark
    );

    formData.append('CreateSubject_id', CreateSubjectId);
    formData.append('question', this.createSubjectQuestion.value.questions);
    formData.append('ideal_answer', this.createSubjectQuestion.value.ansOne);
    formData.append('ideal_answer_status', IdealAnsStatus);
    formData.append('ideal_ans1', this.createSubjectQuestion.value.multiOne);
    formData.append('ideal_ans1_status', ansOneValue);
    formData.append('ideal_ans2', this.createSubjectQuestion.value.multiTwo);
    formData.append('ideal_ans2_status', ansTwoValue);
    formData.append('ideal_ans3', this.createSubjectQuestion.value.multiThree);
    formData.append('ideal_ans3_status', ansThreeValue);
    formData.append('ideal_ans4', this.createSubjectQuestion.value.multiFour);
    formData.append('ideal_ans4_status', ansFourValue);
    formData.append('teacher_id', this.teacher_id);

    // formData.append('question_list', JSON.stringify(subjectList));

    // console.log(formData);
    this.teacherPanel.getAddSubjectQuestion(formData).subscribe((res) => {
      console.log(res);
      this.openSnackBar('Question Added Successfully!', 'dismiss');
      this.getTeacherQueList();
    });
  }
}
