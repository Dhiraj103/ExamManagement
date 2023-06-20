import { AdminStudentService } from './../../../../services/admin-student.service';
import { ExaminerPanelService } from './../../../../services/examiner-panel.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ExaminerService } from 'src/app/services/examiner.service';

import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { InstituteService } from 'src/app/services/institute.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  hide = true;
  addexaminer: any;
  data: any;
  date1: any;
  res: any;
  institutelist: any;
  institutedata: any;
  getImgExt: any;
  selectedFile: any;
  ImgUrl: any;
  imgName: any;
  role: any;

  password: any = 123;
  examinerclassListData: any;
  examinerclassList: any;
  examinerAcademicYearListData: any;
  examinerAcademicYearList: any;
  examinerDivisionListData: any;
  examinerDivisionList: any;

  constructor(
    private fb: FormBuilder,
    private _examiner: ExaminerService,
    private _institute: InstituteService,
    private _examiner_panel: ExaminerPanelService,
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private studentAdmin: AdminStudentService
  ) {}

  ngOnInit(): void {
    this.getExaminerClassList();
    this.getExaminerAcademicYearList();
    this.getExaminerDivisionList();
    this.loadForm();
    this.getInstitutes();
  }
  getExaminerClassList() {
    this._examiner_panel.getClassList(this.data).subscribe((res) => {
      this.examinerclassListData = res;
      this.examinerclassList = this.examinerclassListData.data;
      console.log(this.examinerclassList);
    });
  }

  getExaminerAcademicYearList() {
    this._examiner_panel.getAcademicYearList(this.data).subscribe((res) => {
      this.examinerAcademicYearListData = res;
      this.examinerAcademicYearList = this.examinerAcademicYearListData.data;
      console.log(this.examinerAcademicYearList);
    });
  }

  getExaminerDivisionList() {
    this._examiner_panel.getDivisionList(this.data).subscribe((res) => {
      this.examinerDivisionListData = res;
      this.examinerDivisionList = this.examinerDivisionListData.data;
      console.log(this.examinerDivisionList);
    });
  }

  getInstitutes() {
    this._institute.getInstituteList().subscribe((res) => {
      this.institutedata = res;
      this.institutelist = this.institutedata.data;
      console.log(this.institutelist);
    });
  }

  loadForm() {
    this.addexaminer = this.fb.group({
      institute: ['', Validators.compose([Validators.required])],
      employee_id: ['', Validators.compose([Validators.required])],
      user_name: ['', Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      user_email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      user_mobile: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ]),
      ],
      user_password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      user_dob: ['', Validators.compose([Validators.required])],
      aadhar_number: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      division: ['', Validators.compose([Validators.required])],
      class: ['', Validators.compose([Validators.required])],
      academic: ['', Validators.compose([Validators.required])],
    });
  }

  onSubmit() {
    const formData = new FormData();

    let getDatePicker1 = this.addexaminer.value.user_dob;
    //let dateFormat1 = this.datepipe.transform(getDatePicker1, 'dd-MM-yyyy');
    let dateFormat1 = this.datepipe.transform(getDatePicker1, 'yyyy-MM-dd');
    this.date1 = dateFormat1;
    this.role = 4;

    formData.append('uid_number', this.addexaminer.value.employee_id);
    formData.append('name', this.addexaminer.value.user_name);
    formData.append('lastname', this.addexaminer.value.last_name);
    formData.append('email', this.addexaminer.value.user_email);
    formData.append('password', this.addexaminer.value.user_password);

    formData.append('date_of_birth', this.date1);
    formData.append('aadhar_number', this.addexaminer.value.aadhar_number);
    formData.append('mobile', this.addexaminer.value.user_mobile);
    formData.append('address', this.addexaminer.value.address);

    formData.append('role', this.role);
    formData.append('scanner_mid', '');
    formData.append('institute_id', this.addexaminer.value.institute);
    formData.append('division_id', this.addexaminer.value.division);
    formData.append('class_id', this.addexaminer.value.class);
    formData.append('academic_id', this.addexaminer.value.academic);
    formData.append('image', this.selectedFile);

    this.studentAdmin.addStudent(formData).subscribe((res) => {
      this.data = res;
      if (this.data.success == true) {
        this.openSnackBar('Student Added Successfully!', 'dismiss');
        this.router.navigate(['../../admin/list-student'], {
          relativeTo: this.route,
        });
      } else {
        this.openSnackBar(this.data.message, 'dismiss');
      }

      console.log(this.data);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  readUrl(event: any) {
    let selResult = event.target.value.split('.');
    this.getImgExt = selResult.pop();
    this.getImgExt.toLowerCase();
    if (
      this.getImgExt == 'png' ||
      this.getImgExt == 'jpg' ||
      this.getImgExt == 'jpeg'
    ) {
      this.selectedFile = <File>event.target.files[0];
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.ImgUrl = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
        this.imgName = event.target.files[0].name;
      }
    } else {
      /*this.matSnackBar.open("Profile image allowed only jpg or png format", 'Close', {
        duration: 5000,
      });*/
    }
  }
}
