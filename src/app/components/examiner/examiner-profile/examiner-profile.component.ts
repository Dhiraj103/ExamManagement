import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ExaminerService } from 'src/app/services/examiner.service';
import { ExaminerPanelService } from 'src/app/services/examiner-panel.service';

declare var $: any;

@Component({
  selector: 'app-examiner-profile',
  templateUrl: './examiner-profile.component.html',
  styleUrls: ['./examiner-profile.component.css']
})
export class ExaminerProfileComponent implements OnInit {
  addProfile: any;
  ImgUrl: any;
  changePass: any;
  date: any;
  employee_id: any;
  result: any;
  scannerRes: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    public datepipe: DatePipe,
    private _examinor_panel: ExaminerService,
    private _examinerService: ExaminerService
  ) {}

  ngOnInit(): void {
    this.employee_id = localStorage.getItem('user_id');
    // console.log(this.employee_id);
    this.examinerDataFetch();
    this.loadForm2();
  }

  // getStudentProfileList() {
  //   this._student_panel.getStudentList(this.data).subscribe((res) => {
  //     this.studentProfileListData = res;
  //     this.studentProfileList = this.studentProfileListData.data;
  //     console.log(this.studentProfileList);
  //   });
  // }

  // getStudentPassword() {
  //   this._student_panel.getStudentPassword(this.data).subscribe((res) => {
  //     this.studentPasswordData = res;
  //     this.studentPassword = this.studentPasswordData.data;
  //     console.log(this.studentPassword);
  //   });
  // }

  examinerDataFetch() {
    const formData = new FormData();
    formData.append('user_id', this.employee_id);

    //changes need to be done when add teacher is done

    
    this._examinerService.editExaminer(formData).subscribe((res) => {
      this.result = res;
      this.scannerRes = this.result.data;
      // console.log(this.scannerRes);
      this.loadForm(this.scannerRes);
    });
  }

  navigateDashboard() {
    this.router.navigate(['/teacher/teacher/app-teacher-dashboard']);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  validatePasswords(control: AbstractControl) {
    const passwd = control.root.get('password');
    if (passwd) {
      const subscription = passwd.valueChanges.subscribe(() => {
        control.updateValueAndValidity();
        subscription.unsubscribe();
      });
    }
    return passwd && control.value !== passwd.value
      ? Promise.reject({ passwordMismatch: true })
      : Promise.resolve(null);
  }

  loadForm(data: any) {
    // console.log(data);
    this.addProfile = this.fb.group({
      name: [data.name, Validators.compose([Validators.required])],
      number: [data.mobile, Validators.compose([Validators.required])],
      doj: [data.created_at, Validators.compose([Validators.required])],
      email: [data.email, Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      state: ['Maharashtra', Validators.compose([Validators.required])],
      country: ['India', Validators.compose([Validators.required])],
      employee_id: [data.uid_number, Validators.compose([Validators.required])],
    });

    this.ImgUrl = data.image_url;
  }

  loadForm2() {
    this.changePass = this.fb.group({
      password: ['', Validators.required],
      re_password: ['', Validators.required, this.validatePasswords],
    });
  }

  passChange() {
    const formData = new FormData();
    formData.append('password', this.changePass.value.password);
    formData.append('confirm_password', this.changePass.value.re_password);
    formData.append('student_id', this.employee_id);

    if (this.changePass.value.password !== this.changePass.value.re_password) {
      this.changePass.controls['re_password'].setErrors({
        passwordMismatch: true,
      });
      return;
    } else if (
      this.changePass.value.password == '' ||
      this.changePass.value.re_password == ''
    ) {
      this.openSnackBar('Please enter valid password!', 'dismiss');
      return;
    } else {
      this._examinor_panel
        .changeExaminerPassword(formData)
        .subscribe((res: any) => {
          // console.log(res);

          this.loadForm2();

          this.openSnackBar('Password Changed Successfully!', 'dismiss');
        });
      $('#exampleModal').modal('hide');
    }
  }

  onSubmit() {
    const formData = new FormData();
    let getDatePicker = this.addProfile.value.doj;
    let dateFormat = this.datepipe.transform(getDatePicker, 'yyyy-MM-dd');
    this.date = dateFormat;
  }
}