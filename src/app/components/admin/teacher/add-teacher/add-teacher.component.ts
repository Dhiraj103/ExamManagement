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
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css'],
})
export class AddTeacherComponent implements OnInit {
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

  constructor(
    private fb: FormBuilder,
    private _examiner: ExaminerService,
    private _institute: InstituteService,
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.getInstitutes();
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
    });
  }

  onSubmit() {
    const formData = new FormData();

    let getDatePicker1 = this.addexaminer.value.user_dob;
    //let dateFormat1 = this.datepipe.transform(getDatePicker1, 'dd-MM-yyyy');
    let dateFormat1 = this.datepipe.transform(getDatePicker1, 'yyyy-MM-dd');
    this.date1 = dateFormat1;
    this.role = 3;

    formData.append('institute_id', this.addexaminer.value.institute);
    formData.append('uid_number', this.addexaminer.value.employee_id);
    formData.append('name', this.addexaminer.value.user_name);
    formData.append('email', this.addexaminer.value.user_email);
    formData.append('password', this.addexaminer.value.user_password);
    formData.append('mobile', this.addexaminer.value.user_mobile);
    formData.append('date_of_birth', this.date1);
    formData.append('aadhar_number', this.addexaminer.value.aadhar_number);
    formData.append('address', this.addexaminer.value.address);
    formData.append('image', this.selectedFile);
    formData.append('role', this.role);

    this._examiner.saveExaminer(formData).subscribe((res) => {
      this.data = res;
      if (this.data.success == true) {
        this.openSnackBar('Teacher Added Successfully!', 'dismiss');
        this.router.navigate(['../../admin/list-teacher'], {
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
