import { ExaminerService } from './../../../services/examiner.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort,Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ScannerPanelService } from 'src/app/services/scanner-panel.service';
import { groupBy } from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';
import {LiveAnnouncer} from '@angular/cdk/a11y';

declare var $: any;
@Component({
  selector: 'app-scanner-dashboard',
  templateUrl: './scanner-dashboard.component.html',
  styleUrls: ['./scanner-dashboard.component.css'],
})
export class ScannerDashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'sheet_name',
    'exam_name',

    'subject',
    'class',
    'year_name',
    'division',
    // 'exam_date',
    'students',
    'Action',
  ];
  selectbox: any;
  scannerDashboardListData: any;
  scannerDashboardList: any;
  dataSource: any;
  length: any;
  pageIndex: any;
  pageSize = 10;
  data: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  roleId: any;
  filterName: any;
  groupedData: any;
  collections: any;
  examinerData: any;
  examinerDataList: any;
  currentRow: any;
  // ExaminerService: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private ExaminerService: ExaminerService,
    private scannerService: ScannerPanelService,
    private _snackBar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.getScannerDashboardList();
    this.getExaminer();
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) { 
    if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }
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

  loadForm() {
    this.selectbox = this.fb.group({
      // exam_name: ['', Validators.compose([Validators.required])],
      subject: ['', Validators.compose([Validators.required])],
      class: ['', Validators.compose([Validators.required])],
    });
  }

  navigateAddScanner() {
    this.router.navigate(['./scanner/scanner/app-add-answer-sheet']);
    // console.log('clicked');
  }

  getScannerDashboardList() {
    const formData = new FormData();
    this.roleId = localStorage.getItem('role');
    formData.append('role_id', this.roleId);
    this.scannerService.getScannerDashboardList(formData).subscribe((res) => {
      this.scannerDashboardListData = res;
      this.scannerDashboardList = this.scannerDashboardListData.data;
      // console.log(this.scannerDashboardList);
      // this.groupedData = groupBy(
      //   this.scannerDashboardList,
      //   (row) =>
      //     `${row.sheet_name}_${row.class_id}_${row.class_name}_${row.exam_name}`
      // );
      // console.log(this.groupedData);
      // this.collections = Object.keys(this.groupedData).map((key) => ({
      //   FolderName: this.groupedData[key][0].sheet_name,
      //   exam_name: this.groupedData[key][0].exam_name,
      //   subject: this.groupedData[key][0].subject,
      //   class_name: this.groupedData[key][0].class_name,
      //   division_name: this.groupedData[key][0].division_name,
      //   year_name: this.groupedData[key][0].year_name,
      //   totalStudents: this.groupedData[key][0].exam_name,
      //   UploadedBy: this.groupedData[key][0].exam_name,
      //   children: this.groupedData[key],
      // }));
      this.dataSource = new MatTableDataSource(this.scannerDashboardList);
      this.length = this.scannerDashboardList.length;
      // console.log(this.length);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      setTimeout(() => {
        this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.length;
      });
      // console.log(this.collections);
      // this.id = this.examinerExamManagementList[0].exam_details_id;
      // console.log(this.id);
      // console.log(this.dataSource);
    });
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.getScannerDashboardList();
  }

  getExaminer() {
    const formData = new FormData();
    formData.append('role', '2');

    this.ExaminerService.getExaminerList(formData).subscribe((res) => {
      // console.log(res);
      this.examinerData = res;
      this.examinerDataList = this.examinerData.data;
      // console.log(this.examinerDataList);
    });
  }

  openSendModal(row: any) {
    // console.log(row);

    this.currentRow = row;

    $('#exampleModalLong').modal('show'); // assuming you have jQuery and Bootstrap loaded
  }
  closeModal() {
    $('#exampleModalLong').modal('hide');
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
  sendFolder(list: any, row: any) {
    // console.log(list);

    // console.log(row);
    // console.log(row.subject);

    // console.log(list);
    // console.log(row);
    let userId: any = localStorage.getItem('user_id');
    const formData = new FormData();
    formData.append('examiner_id', list.id);
    formData.append('assigned_by_scanner', userId);
    formData.append('sheet_name', row.sheet_name);
    formData.append('class_id', row.class_id);
    formData.append('academic_year_id', row.academic_year_id);
    formData.append('division_id', row.division_id);
    formData.append('subject', row.subject);

    this.scannerService.sendFolderToExaminer(formData).subscribe((res: any) => {
      // console.log(res);
      this.data = res;
      if (this.data.success === true) {
        this.closeModal();
        this._snackBar.open('Folder Sent to Examiner.', 'Dismiss', {
          duration: 5000,
        });
      } else if (this.data.success === false) {
        this.closeModal();
        this._snackBar.open('Error Folder already sent to admin.', 'Dismiss', {
          duration: 5000,
        });
      }
    });
  }
}
