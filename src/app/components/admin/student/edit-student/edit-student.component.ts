import { AdminStudentService } from './../../../../services/admin-student.service';
import { ExaminerPanelService } from 'src/app/services/examiner-panel.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExaminerService } from 'src/app/services/examiner.service';
import { InstituteService } from 'src/app/services/institute.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {
  editExaminerid: any;
  // res: any;
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
  examinerclassListData: any;
  examinerclassList: any;
  examinerAcademicYearListData: any;
  examinerAcademicYearList: any;
  examinerDivisionListData: any;
  examinerDivisionList: any;
  roleId: any;
  constructor(
    private router: Router,
    private _examinerService: ExaminerService,
    private _institute: InstituteService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private _examiner_panel: ExaminerPanelService,
    private studentAdmin: AdminStudentService
  ) {}

  ngOnInit(): void {
    this.editExaminerid = this.route.snapshot.params.id;
    this.getInstitutes();
    this.getExaminerClassList();
    this.getExaminerAcademicYearList();
    this.getExaminerDivisionList();
    this.studentDetails();
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
      //console.log(this.institutelist);
    });
  }

  studentDetails() {
    const formData = new FormData();
    formData.append('id', this.editExaminerid);
    this.studentAdmin.fetchStudentData(formData).subscribe((res) => {
      this.result = res;
      this.examinerres = this.result.data;
      console.log(this.examinerres);
      this.studentEdit(this.examinerres);
    });
  }

  studentEdit(data: any) {
    this.editExaminer = this.fb.group({
      institute: [
        data[0].institute_id,
        Validators.compose([Validators.required]),
      ],
      employee_id: [
        data[0].uid_number,
        Validators.compose([Validators.required]),
      ],
      user_name: [data[0].name, Validators.compose([Validators.required])],
      user_mobile: [
        data[0].mobile,
        Validators.compose([
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        ]),
      ],
      user_email: [
        data[0].email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      // user_password: [data.password],
      user_dob: [
        data[0].date_of_birth,
        Validators.compose([Validators.required]),
      ],
      aadhar_number: [
        data[0].aadhar_number,
        Validators.compose([Validators.required]),
      ],
      address: [data[0].address, Validators.compose([Validators.required])],
      division: [
        data[0].division_id,
        Validators.compose([Validators.required]),
      ],
      class: [data[0].class_id, Validators.compose([Validators.required])],
      academic: [
        data[0].academic_id,
        Validators.compose([Validators.required]),
      ],
    });

    this.ImgUrl = data[0].image_url;
  }

  onSubmit() {
    const formData = new FormData();
    this.roleId = localStorage.getItem('role');
    let getDatePicker1 = this.editExaminer.value.user_dob;
    let dateFormat1 = this.datepipe.transform(getDatePicker1, 'yyyy-MM-dd');
    this.date1 = dateFormat1;

    formData.append('id', this.editExaminerid);
    formData.append('uid_number', this.editExaminer.value.employee_id);
    formData.append('name', this.editExaminer.value.user_name);
    formData.append('email', this.editExaminer.value.user_email);
    // formData.append('password', this.editExaminer.value.password);
    formData.append('date_of_birth', this.date1);
    formData.append('aadhar_number', this.editExaminer.value.aadhar_number);
    formData.append('mobile', this.editExaminer.value.user_mobile);
    formData.append('address', this.editExaminer.value.address);
    formData.append('role', this.roleId);
    formData.append('scanner_mid', '');
    formData.append('institute_id', this.editExaminer.value.institute);
    formData.append('division_id', this.editExaminer.value.division);
    formData.append('class_id', this.editExaminer.value.class);
    formData.append('academic_id', this.editExaminer.value.academic);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else {
      formData.append('image', this.ImgUrl);
    }

    console.log(this.editExaminerid);
    console.log(this.editExaminer.value.employee_id);
    console.log(this.editExaminer.value.user_name);
    console.log(this.editExaminer.value.user_email);
    console.log(this.date1);
    console.log(this.editExaminer.value.aadhar_number);
    console.log(this.editExaminer.value.user_mobile);
    console.log(this.editExaminer.value.address);
    console.log(this.roleId);
    console.log(this.editExaminer.value.institute);
    console.log(this.editExaminer.value.division);
    console.log(this.editExaminer.value.class);
    console.log(this.editExaminer.value.academic);
    console.log(this.selectedFile, this.ImgUrl);

    this.studentAdmin.updateStudent(formData).subscribe((res) => {
      this.data = res;
      if (this.data.success == true) {
        this.openSnackBar('Student Updated Successfully!', 'dismiss');
        this.router.navigate(['../../../admin/list-student'], {
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
