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
  selector: 'app-add-institute',
  templateUrl: './add-institute.component.html',
  styleUrls: ['./add-institute.component.css'],
})
export class AddInstituteComponent implements OnInit {
  institutelist: any;
  institutedata: any;
  addinstitute: any;
  getImgExt: any;
  selectedFile: any;
  ImgUrl: any;
  imgName: any;
  data: any;

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
    this.addinstitute = this.fb.group({
      institute: ['', Validators.compose([Validators.required])],
      university: ['', Validators.compose([Validators.required])],
      logo: ['', Validators.compose([Validators.required])],
    });
  }

  onSubmit() {
    const formData = new FormData();

    formData.append('institute_name', this.addinstitute.value.institute);
    formData.append('university', this.addinstitute.value.university);
    formData.append('image', this.selectedFile);

    this._institute.saveInstitute(formData).subscribe((res) => {
      this.data = res;
      console.log(this.data);
      if (this.data.success == true) {
        this.openSnackBar('Institute Added Successfully!', 'dismiss');
        this.router.navigate(['../../admin/list-institute'], {
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
