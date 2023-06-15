import { ExaminerService } from 'src/app/services/examiner.service';
import { ScannerPanelService } from './../../../services/scanner-panel.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ExaminerPanelService } from 'src/app/services/examiner-panel.service';
import { groupBy } from 'lodash';
declare var $: any;
@Component({
  selector: 'app-answer-sheets',
  templateUrl: './answer-sheets.component.html',
  styleUrls: ['./answer-sheets.component.css'],
})
export class AnswerSheetsComponent implements OnInit {
  displayedColumns: string[] = [
    'FolderName',
    'subject_name',
    'class_name',
    'division_name',
    'exam_date',
    'totalStudents',
    'UploadedBy',
    'Action',
  ];

  examinerExamManagementListData: any;
  examinerExamManagementList: any;
  dataSource: any;
  length: any;
  pageIndex: any;
  pageSize = 10;
  data: any;
  filterName: any = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  role: '2' = '2';
  http: any;
  route: ActivatedRoute | null | undefined;
  groupedData: any;
  collections: any;
  teacherData: any;
  teacherDataList: any;
  currentRow: any;
  constructor(
    private router: Router,
    private examinerMana: ExaminerPanelService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private scannerSer: ScannerPanelService,
    private ExaminerService: ExaminerService
  ) {}

  ngOnInit(): void {
    this.getAnswerSheets();
    this.getTeacherList();
  }
  getAnswerSheets() {
    // const fromData = new FormData();
    // fromData.append('role_id', '5');
    this.examinerMana.getSentExaminerAnsList(1).subscribe((res) => {
      // console.log(res);
      this.data = res;

      this.dataSource = new MatTableDataSource(this.data.data);
      this.length = this.data.data.length;
      // console.log(this.length);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      setTimeout(() => {
        this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.length;
      });
    });
  }
  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.getAnswerSheets();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterName = filterValue.trim().toLowerCase();
    // this.getProducts();
    // console.log(this.filterName);
    /*if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }*/
    this.dataSource.filter = this.filterName;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTeacherList() {
    const formData = new FormData();
    formData.append('role', '3');

    this.ExaminerService.getExaminerList(formData).subscribe((res) => {
      this.teacherData = res;

      this.teacherDataList = this.teacherData.data;
      // console.log(this.teacherDataList);
    });
  }

  openSendModal(row: any) {
    this.currentRow = row;
    // console.log('clicked');

    $('#exampleModalLong').modal('show'); // assuming you have jQuery and Bootstrap loaded
  }
  closeModal() {
    $('#exampleModalLong').modal('hide');
  }

  assignTeacher(list: any, row: any) {
    // console.log(list);
    // console.log(row);

    let userId: any = localStorage.getItem('user_id');
    const formData = new FormData();
    formData.append('assigned_sheet_id', row.id);
    formData.append('teacher_id', list.id);
    formData.append('assigned_by_examiner', userId);
    formData.append('sheet_name', row.sheet_name);
    formData.append('class_id', row.class_id);
    formData.append('academic_year_id', row.academic_year_id);
    formData.append('division_id', row.division_id);
    formData.append('subject', row.subject);

    this.examinerMana.sendFolderToTeacher(formData).subscribe((res: any) => {
      // console.log(res);
      this.data = res;
      if (this.data.success === true) {
        this.closeModal();
        this._snackBar.open('Folder Assigned to Teacher.', 'Dismiss', {
          duration: 5000,
        });
      } else if (this.data.success === false) {
        this.closeModal();
        this._snackBar.open(
          'Error Folder already assigned to Teacher.',
          'Dismiss',
          {
            duration: 5000,
          }
        );
      }
    });
  }
}
