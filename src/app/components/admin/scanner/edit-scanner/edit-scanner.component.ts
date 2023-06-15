import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExaminerService } from 'src/app/services/examiner.service';
import { InstituteService } from 'src/app/services/institute.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-scanner',
  templateUrl: './edit-scanner.component.html',
  styleUrls: ['./edit-scanner.component.css'],
})
export class EditScannerComponent implements OnInit {
  editExaminerid: any;
  res: any;
  result: any;
  examinerres: any;
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

  constructor(
    private router: Router,
    private _examinerService: ExaminerService,
    private _institute: InstituteService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.editExaminerid = this.route.snapshot.params.id;
    this.getInstitutes();
    this.scannerDetails();
  }

  getInstitutes() {
    this._institute.getInstituteList().subscribe((res) => {
      this.institutedata = res;
      this.institutelist = this.institutedata.data;
      //console.log(this.institutelist);
    });
  }

  scannerDetails() {
    const formData = new FormData();
    formData.append('user_id', this.editExaminerid);
    this._examinerService.editExaminer(formData).subscribe((res) => {
      this.result = res;
      this.examinerres = this.result.data;
      console.log(this.examinerres);
      this.scannerEdit(this.examinerres);
    });
  }

  scannerEdit(data: any) {
    this.editExaminer = this.fb.group({
      institute: [data.institute_id, Validators.compose([Validators.required])],
      employee_id: [data.uid_number, Validators.compose([Validators.required])],
      user_name: [data.name, Validators.compose([Validators.required])],
      user_mobile: [
        data.mobile,
        Validators.compose([
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        ]),
      ],
      user_email: [
        data.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      user_password: [data.password],
      user_dob: [data.date_of_birth, Validators.compose([Validators.required])],
      aadhar_number: [
        data.aadhar_number,
        Validators.compose([Validators.required]),
      ],
      address: [data.address, Validators.compose([Validators.required])],
    });
    this.ImgUrl = data.image_url;
  }

  onSubmit() {
    const formData = new FormData();

    let getDatePicker1 = this.editExaminer.value.user_dob;
    let dateFormat1 = this.datepipe.transform(getDatePicker1, 'yyyy-MM-dd');
    this.date1 = dateFormat1;

    formData.append('id', this.editExaminerid);
    formData.append('institute_id', this.editExaminer.value.institute);
    formData.append('uid_number', this.editExaminer.value.employee_id);
    formData.append('name', this.editExaminer.value.user_name);
    formData.append('email', this.editExaminer.value.user_email);
    formData.append('password', this.editExaminer.value.password);
    formData.append('mobile', this.editExaminer.value.user_mobile);
    formData.append('date_of_birth', this.date1);
    formData.append('aadhar_number', this.editExaminer.value.aadhar_number);
    formData.append('address', this.editExaminer.value.address);
    formData.append('image', this.selectedFile);

    this._examinerService.updateExaminer(formData).subscribe((res) => {
      this.data = res;
      if (this.data.success == true) {
        this.openSnackBar('Scanner Updated Successfully!', 'dismiss');
        this.router.navigate(['../../../admin/list-scanner'], {
          relativeTo: this.route,
        });
      } else {
        this.openSnackBar(this.data.message, 'dismiss');
      }
      //console.log('success');

      //console.log(this.data);
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
