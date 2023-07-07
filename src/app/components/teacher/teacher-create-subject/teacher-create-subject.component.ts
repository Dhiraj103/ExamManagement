import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherPanelService } from 'src/app/services/teacher-panel.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-teacher-create-subject',
  templateUrl: './teacher-create-subject.component.html',
  styleUrls: ['./teacher-create-subject.component.css'],
})
export class TeacherCreateSubjectComponent implements OnInit {
  selectedAnswer: boolean = false;
  showInput = false;
  inputFields = [{ value: '' }]; // initialize inputFields with one empty object
  TeacherQuestionTypeList = [
    { id: 1, question_type: 'Type 1' },
    { id: 2, question_type: 'Type 2' },
    { id: 3, question_type: 'Type 3' },
  ];
  // form: FormGroup;
  // formArray: FormArray;
  createSubject: any;
  data: any;
  TeacherQuestionNumberListData: any;
  TeacherQuestionNumberList: any;
  TeacherQuestionTypeListData: any;
  // TeacherQuestionTypeList: any;
  TeacherQuestionPartListData: any;
  TeacherQuestionPartList: any;
  TeacherQuestionMarkListData: any;
  TeacherQuestionMarkList: any;
  // TeacherAddSubjectQuestionData: any;
  TeacherAddSubjectQuestion: any;
  role: any;
  formBuilder: any;
  teacher_id: any;
  examDetailId: any;
  examSubjectId: any;
  CreateSubject_id: any;
  subjectQData: any;
  subjectQDataList: any;
  answers: any;
  form: any;
  multiOneCorrect: any;
  isMultiOneCorrect = 0;
  isMultiTwoCorrect = 0;
  isMultiThreeCorrect = 0;
  isMultiFourCorrect = 0;
  CreateSubjectId: any;
  loader = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _teacher_panel: TeacherPanelService
  ) {
    // this.form = this.fb.group({
    //   formArray: this.fb.array([new FormControl(null)])
    // });
    // this.formArray = this.form.get('formArray') as FormArray;
  }

  ngOnInit(): void {
   
    setTimeout(()=>{                           
      this.loader = false;
  }, 1000);
    this.loadForm();
    this.getTeacherQuestionNumberList();
    this.getTeacherQuestionTypeList();
    this.getTeacherQuestionPartList();
    this.getTeacherQuestionMarkList();
    // this.getQuesList();
    // this.getTeacherAddSubjectQuestion();
    this.teacher_id = localStorage.getItem('user_id');
    console.log(this.teacher_id);
    this.role = localStorage.getItem('role');
    console.log(this.role);
    this.examDetailId = this.route.snapshot.params.id;
    this.examSubjectId = this.route.snapshot.params.subjectId;
  }

  navigateSubjectQuest() {
    this.router.navigate([
      './teacher/teacher/app-teacher-create-subject-question',
    ]);
  }

  navigateDashboard() {
    this.router.navigate(['./teacher/teacher/app-teacher-dashboard']);
  }

  getTeacherQuestionNumberList() {
    this._teacher_panel.getQuestionNumberList(this.data).subscribe((res) => {
      this.TeacherQuestionNumberListData = res;
      this.TeacherQuestionNumberList = this.TeacherQuestionNumberListData.data;
      console.log(this.TeacherQuestionNumberList);
    });
  }

  getTeacherQuestionTypeList() {
    this._teacher_panel.getQuestionTypeList(this.data).subscribe((res) => {
      this.TeacherQuestionTypeListData = res;
      this.TeacherQuestionTypeList = this.TeacherQuestionTypeListData.data;
      console.log(this.TeacherQuestionTypeList);
    });
  }

  getTeacherQuestionPartList() {
    this._teacher_panel.getQuestionPartList(this.data).subscribe((res) => {
      this.TeacherQuestionPartListData = res;
      this.TeacherQuestionPartList = this.TeacherQuestionPartListData.data;
      console.log(this.TeacherQuestionPartList);
    });
  }

  getTeacherQuestionMarkList() {
    this._teacher_panel.getQuestionMarkList(this.data).subscribe((res) => {
      this.TeacherQuestionMarkListData = res;
      this.TeacherQuestionMarkList = this.TeacherQuestionMarkListData.data;
      console.log(this.TeacherQuestionMarkList);
    });
  }

  onQueTypeChange(event: { value: number }) {
    if (event.value === 1) {
      this.showInput = true;
      // this.CreateSubjectId = 1;
    } else {
      this.showInput = false;
      // this.CreateSubjectId = '';
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

  // getQuesList() {
  //   const formData = new FormData();
  //   this.role = localStorage.getItem('role');
  //   // console.log(this.role);
  //   formData.append('role_id', this.role);
  //   console.log(this.role);
  //   this._teacher_panel.getTeacherQueList(formData).subscribe((res) => {
  //     console.log(res);
  //   });
  // }

  loadForm() {
    this.createSubject = this.fb.group({
      addInstructions:['',Validators.compose([Validators.required])],
      totalMarks: ['', Validators.compose([Validators.required])],
      PassMarks: ['', Validators.compose([Validators.required])],
      totalQue: ['', Validators.compose([Validators.required])],
      queNumber: ['', Validators.compose([Validators.required])],
      queType: ['', Validators.compose([Validators.required])],
      quePart: ['', Validators.compose([Validators.required])],
      queMark: ['', Validators.compose([Validators.required])],
      questions: ['', Validators.compose([Validators.required])],
      ansOne: ['', Validators.compose([Validators.required])],
      multiOne: ['', Validators.compose([Validators.required])],
      multiTwo: ['', Validators.compose([Validators.required])],
      multiThree: ['', Validators.compose([Validators.required])],
      multiFour: ['', Validators.compose([Validators.required])],
    });
  }

  onSubmit() {
    const ansOneValue: any = this.isMultiOneCorrect ? 1 : 0;
    const ansTwoValue: any = this.isMultiTwoCorrect ? 1 : 0;
    const ansThreeValue: any = this.isMultiThreeCorrect ? 1 : 0;
    const ansFourValue: any = this.isMultiFourCorrect ? 1 : 0;
    console.log(ansOneValue);
    const formData = new FormData();

    // console.log(this.createSubject.value.multiOne);
    // console.log(this.createSubject.value.multiTwo);
    // console.log(this.createSubject.value.multiThree);
    // console.log(this.createSubject.value.multiFour);
    let CreateSubjectId = '';
    // let subjectList = [
    //   {
    //     create_subject_id: this.examSubjectId,
    //     question_number_id: this.createSubject.value.queNumber,
    //     question_type_id: this.createSubject.value.queType,
    //     question_part_id: this.createSubject.value.quePart,
    //     question_mark_id: this.createSubject.value.queMark,
    //     question: this.createSubject.value.questions,
    //     ideal_answer: this.createSubject.value.ansOne,
    //     ideal_answer_status: this.selectedAnswer ? 1 : 0,
    //     multiple: multiple,
    //   },
    // ];

    let IdealAnsStatus: any = this.selectedAnswer ? 1 : 0;
    // console.log(JSON.stringify(subjectList));
    // console.log(subjectList);

    let multiple = [
      {
        ideal_answer_one: this.createSubject.value.multiOne,
        ideal_answer_status_one: ansOneValue,
      },
      {
        ideal_answer_two: this.createSubject.value.multiTwo,
        ideal_answers_status_two: ansTwoValue,
      },
      {
        ideal_answer_three: this.createSubject.value.multiThree,
        ideal_answer_status_three: ansThreeValue,
      },
      {
        ideal_answer_four: this.createSubject.value.multiFour,
        ideal_answer_status_four: ansFourValue,
      },
    ];

    formData.append('exam_details_id', this.examDetailId);
    formData.append('total_marks', this.createSubject.value.totalMarks);
    formData.append('passed_marks', this.createSubject.value.PassMarks);
    formData.append('total_questions', this.createSubject.value.totalQue);
    formData.append('role_id', this.role);
    formData.append('CreateSubject_id', CreateSubjectId);
    formData.append('question_number_id', this.createSubject.value.queNumber);
    formData.append('question_type_id', this.createSubject.value.queType);
    formData.append('question_part_id', this.createSubject.value.quePart);
    formData.append('question_mark_id', this.createSubject.value.queMark);
    formData.append('question', this.createSubject.value.questions);
    formData.append('ideal_answer', this.createSubject.value.ansOne);
    formData.append('ideal_answer_status', IdealAnsStatus);
    formData.append('ideal_ans1', this.createSubject.value.multiOne);
    formData.append('ideal_ans1_status', ansOneValue);
    formData.append('ideal_ans2', this.createSubject.value.multiTwo);
    formData.append('ideal_ans2_status', ansTwoValue);
    formData.append('ideal_ans3', this.createSubject.value.multiThree);
    formData.append('ideal_ans3_status', ansThreeValue);
    formData.append('ideal_ans4', this.createSubject.value.multiFour);
    formData.append('ideal_ans4_status', ansFourValue);
    formData.append('teacher_id', this.teacher_id);
    // formData.append('question_list', JSON.stringify(subjectList));

    console.log(this.createSubject.value.queNumber);
    console.log(this.createSubject.value.ansOne);
    this._teacher_panel.getAddSubjectQuestion(formData).subscribe((res) => {
      console.log(res);

      this.subjectQData = res;
      this.subjectQDataList = this.subjectQData;
      console.log(this.subjectQDataList);
      this.CreateSubject_id = this.subjectQDataList.CreateSubject_id;
      console.log(this.CreateSubject_id);
      this.router.navigate([
        './teacher/teacher/app-teacher-create-subject-question',
        this.CreateSubject_id,
      ]);
    });
  }
}
