import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
// import { ExaminerService } from 'src/app/services/examiner.service';
import { InstituteService } from 'src/app/services/institute.service';

@Component({
  selector: 'app-edit-institute',
  templateUrl: './edit-institute.component.html',
  styleUrls: ['./edit-institute.component.css'],
})
export class EditInstituteComponent implements OnInit {
  editInstitueid: any;
  editInstitute: any;
  res: any;
  result: any;
  instituteres: any;
  institutelist: any;
  institutedata: any;
  editExaminer: any;
  hide = true;
  getImgExt: any;
  selectedFile: any;
  ImgUrl: any;
  imgName: any;
  date1: any;
  data: any;
  addinstitute: any;

  constructor(
    private router: Router,

    private _institute: InstituteService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.editInstitueid = this.route.snapshot.params.id;

    this.instituteDetails();
  }

  // getInstitutes() {
  //   this._institute.getInstituteList().subscribe((res) => {
  //     this.institutedata = res;
  //     this.institutelist = this.institutedata.data;
  //     console.log(this.institutelist);
  //   });
  // }

  instituteDetails() {
    const formData = new FormData();
    formData.append('id', this.editInstitueid);

    this._institute.editInstitute(formData).subscribe((res) => {
      this.result = res;
      console.log(this.result);
      this.instituteres = this.result.data;
      console.log(this.instituteres);
      this.instituteEdit(this.instituteres);
      // console.log(this.editInstitueid);
    });
  }

  instituteEdit(data: any) {
    this.editInstitute = this.fb.group({
      institute: [data.institute_name],
      university: [data.university],
    });
    console.log(this.editInstitute);
    this.ImgUrl = data.logo;
  }

  onSubmit() {
    const formData = new FormData();

    formData.append('id', this.editInstitueid);
    console.log(this.editInstitueid);
    formData.append('institute_name', this.editInstitute.value.institute);
    console.log(this.editInstitute.value.institute);
    formData.append('university', this.editInstitute.value.university);
    console.log(this.editInstitute.value.university);
    formData.append('image', this.selectedFile);
    console.log(this.selectedFile);

    console.log(this.editInstitute.value.institute);

    this._institute.updateInstitute(formData).subscribe((res) => {
      this.data = res;
      console.log(this.data);
      if (this.data.success == true) {
        this.openSnackBar('Institute Updated Successfully!', 'dismiss');
        this.router.navigate(['../../list-institute'], {
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
