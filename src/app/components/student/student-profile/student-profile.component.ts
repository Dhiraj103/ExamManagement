import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
declare var $ :any;

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
})
export class StudentProfileComponent implements OnInit {
  addProfile: any;
  student_id: any;
  date: any;
  name: any;
  data: any;
  studentProfileListData: any;
  studentProfileList: any;
  studentPasswordData: any;
  studentPassword: any;
  result: any;
  studentRes: any;
  changePass: any;
  ImgUrl: any;

  constructor(
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private _student_panel: StudentService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // this.loadForm(this.data);
    this.student_id = localStorage.getItem('user_id');
    console.log(this.student_id);
    this.studentDataFetch();
    this.loadForm2();
  }

  studentDataFetch() {
    const formData = new FormData();
    formData.append('id', this.student_id);
    this._student_panel.fetchStudentData(formData).subscribe((res) => {
      this.result = res;
      this.studentRes = this.result.data[0];
      console.log(this.studentRes);
      this.loadForm(this.studentRes);
      console.log(res);
    });
  }

  navigateDashboard() {
    this.router.navigate(['/student/student/app-student-dashboard']);
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
    console.log(data);
    this.addProfile = this.fb.group({
      name: [data.name, Validators.compose([Validators.required])],
      email: [data.email, Validators.compose([Validators.required])],
      date_of_birth: [
        data.date_of_birth,
        Validators.compose([Validators.required]),
      ],
      aadhar_number: [
        data.aadhar_number,
        Validators.compose([Validators.required]),
      ],
      mobile: [data.mobile, Validators.compose([Validators.required])],
      address: [data.address, Validators.compose([Validators.required])],
      institute_id: [
        data.institute_name,
        Validators.compose([Validators.required]),
      ],
      division_id: [
        data.division_name,
        Validators.compose([Validators.required]),
      ],
      class_id: [data.class_name, Validators.compose([Validators.required])],
      academic_id: [data.year_name, Validators.compose([Validators.required])],
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
    formData.append('student_id', this.student_id);

    if (this.changePass.value.password !== this.changePass.value.re_password) {
      this.changePass.controls['re_password'].setErrors({ passwordMismatch: true });
      return;
    } else if(this.changePass.value.password == '' || this.changePass.value.re_password == ''){
        this.openSnackBar('Please enter valid password!', 'dismiss');
        return
    }
    else{
      this._student_panel.ChangeStudentPassword(formData).subscribe((res:any) => {
        console.log(res);
        this.loadForm2()
        $('#exampleModal').modal('hide');
        this.openSnackBar('Password Changed Successfully!', 'dismiss');
      })
    }
  }

  onSubmit() {
    const formData = new FormData();
    let getDatePicker = this.addProfile.value.doj;
    let dateFormat = this.datepipe.transform(getDatePicker, 'yyyy-MM-dd');
    this.date = dateFormat;
    formData.append('student_id', this.student_id);
    formData.append('name', this.addProfile.value.name);
    console.log(this.name);
    formData.append('student_id', this.addProfile.value.student_id);
    formData.append('phone_no', this.addProfile.value.phone_no);
    formData.append('email_id', this.addProfile.value.email_id);
    formData.append('city', this.addProfile.value.city);
    formData.append('state', this.addProfile.value.state);
    formData.append('country', this.addProfile.value.country);
    formData.append('profile_pic', this.addProfile.value.profile_pic);
    console.log(formData);
  }
}
