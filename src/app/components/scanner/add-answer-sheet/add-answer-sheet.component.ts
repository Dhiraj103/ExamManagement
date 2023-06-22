import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExaminerPanelService } from 'src/app/services/examiner-panel.service';
import { map } from 'rxjs/operators';
import { ScannerPanelService } from 'src/app/services/scanner-panel.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-answer-sheet',
  templateUrl: './add-answer-sheet.component.html',
  styleUrls: ['./add-answer-sheet.component.css'],
})
export class AddAnswerSheetComponent implements OnInit {
  addAnswer: any;
  examNames: any;
  subjectNames: any;
  academicYears: any;
  semesters: any;
  divisionIds: any;
  classIds: any;
  data: any;
  examinerclassListData: any;
  examinerclassList: any;
  examinerAcademicYearListData: any;
  examinerAcademicYearList: any;
  examinerSemesterListData: any;
  examinerSemesterList: any;
  examinerDivisionListData: any;
  examinerDivisionList: any;
  getDocExt: any;
  isSubmitting: boolean = false;

  DocUrl: any;
  roleId: any;
  DocUrls: any;
  selectedFiles: any[] = [];
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dropDown: ExaminerPanelService,
    private scannerService: ScannerPanelService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getDropdownFromExaminer();
    this.getExaminerDivisionList();
    this.getExaminerAcademicYearList();
    this.getExaminerClassList();
    this.getExaminerSemesterList();
    this.loadForm();
  }

  getExaminerClassList() {
    this.dropDown.getClassList(this.data).subscribe((res) => {
      this.examinerclassListData = res;
      this.examinerclassList = this.examinerclassListData.data;
      // console.log(this.examinerclassList);
    });
  }

  getExaminerAcademicYearList() {
    this.dropDown.getAcademicYearList(this.data).subscribe((res) => {
      this.examinerAcademicYearListData = res;
      this.examinerAcademicYearList = this.examinerAcademicYearListData.data;
      // console.log(this.examinerAcademicYearList);
    });
  }

  getExaminerSemesterList() {
    this.dropDown.getSemesterList(this.data).subscribe((res) => {
      this.examinerSemesterListData = res;
      this.examinerSemesterList = this.examinerSemesterListData.data;
      // console.log(this.examinerSemesterList);
    });
  }

  getExaminerDivisionList() {
    this.dropDown.getDivisionList(this.data).subscribe((res) => {
      this.examinerDivisionListData = res;
      this.examinerDivisionList = this.examinerDivisionListData.data;
      // console.log(this.examinerDivisionList);
    });
  }

  loadForm() {
    this.addAnswer = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      examname: ['', Validators.compose([Validators.required])],
      subject: ['', Validators.compose([Validators.required])],
      academic: ['', Validators.compose([Validators.required])],
      semester: ['', Validators.compose([Validators.required])],
      class: ['', Validators.compose([Validators.required])],
      division: ['', Validators.compose([Validators.required])],
    });
  }

  getDropdownFromExaminer() {
    this.dropDown.getExamList(this.data).subscribe((res: any) => {
      // console.log(res);
      this.examNames = res.data.map((obj: { exam_name: any }) => obj.exam_name);
      this.subjectNames = res.data.map(
        (obj: { subject_name: any }) => obj.subject_name
      );

      // console.log(this.examNames);
      // console.log(this.subjectNames);
    });
  }

  navigateDashboard() {
    this.router.navigate(['/scanner/scanner/app-scanner-dashboard']);
    // console.log('clicked');
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  setSubmitting(submitting: boolean) {
    this.isSubmitting = submitting;
  }

  onSubmit() {
    console.log('clicked',this.addAnswer.value);
    this._snackBar.open('Uploading...', '', { duration: 0 });
    this.setSubmitting(true);
    const formData = new FormData();
    this.roleId = localStorage.getItem('role');
    let sheetName = this.addAnswer.value.name.replaceAll(' ', '_');

    formData.append('sheet_name', sheetName);
    formData.append('class_id', this.addAnswer.value.class);
    formData.append('exam_name', this.addAnswer.value.examname);
    formData.append('subject', this.addAnswer.value.subject);
    formData.append('academic_year_id', this.addAnswer.value.academic);
    formData.append('semister_id', this.addAnswer.value.semester);
    formData.append('division_id', this.addAnswer.value.division);
    formData.append('role_id', this.roleId);

    // Append all selected files to the FormData object
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append(
        'scanned_file[]',
        this.selectedFiles[i],
        this.selectedFiles[i].name
      );
    }

    this.scannerService.addAnswerSheet(formData).subscribe((res) => {
      // console.log(res);
      this.data = res;
      this.setSubmitting(false);
      if (this.selectedFiles.length === 0) {
        this._snackBar.open('Scanned File is Required!', 'Dismiss', {
          duration: 5000,
        });
      } else if (this.data.success === true) {
        this._snackBar.open(
          'Scanned File(s) Uploaded Successfully!',
          'Dismiss',
          { duration: 5000 }
        );
        this.navigateDashboard();
      } else {
        this._snackBar.open('Upload valid scanned file(s)!', 'Dismiss', {
          duration: 5000,
        });
      }
    });
  }

  readUrl(event: any) {
    console.log("Uploaded file is:",event.target.files[0].name)
    this.addAnswer.value.fileName=event.target.files[0].name;
    this.DocUrls = [];
    const selResult = event.target.value.split('.');
    const ext = selResult.pop().toLowerCase();
    if (ext === 'pdf') {
      const selectedFiles = event.target.files;
      if (selectedFiles.length > 0) {
        for (let i = 0; i < selectedFiles.length; i++) {
          const selectedFile = selectedFiles[i];

          if (selectedFile.type === 'application/pdf') {
            this.selectedFiles.push(selectedFile);
            if (event.target.files && event.target.files[i]) {
              const reader = new FileReader();
              reader.onload = (event: any) => {
                // Set the URL for each file separately
                this.DocUrls[i] = event.target.result;
              };
              reader.readAsDataURL(selectedFile);
              this.DocUrls.push(selectedFile.name);
            }
          } else {
            // console.log('Please select a PDF file');
          }
        }
      }
    } else {
      // console.log('Please select a PDF file');
    }
  }
}
