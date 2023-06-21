import { TeacherPanelService } from 'src/app/services/teacher-panel.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort,Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ExaminerPanelService } from 'src/app/services/examiner-panel.service';
import { ScannerPanelService } from 'src/app/services/scanner-panel.service';
import { groupBy } from 'lodash';
import {LiveAnnouncer} from '@angular/cdk/a11y';


@Component({
  selector: 'app-teacher-answer-sheets',
  templateUrl: './teacher-answer-sheets.component.html',
  styleUrls: ['./teacher-answer-sheets.component.css'],
})
export class TeacherAnswerSheetsComponent implements OnInit {
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
  constructor(
    private router: Router,
    private examinerMana: ExaminerPanelService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private scannerSer: ScannerPanelService,
    private TeacherPanelService: TeacherPanelService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.getAnswerSheets();
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) { 
    if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }
}
  
  getAnswerSheets() {
    const fromData = new FormData();
    fromData.append('role_id', '5');
    this.TeacherPanelService.getAssignedAns().subscribe((res: any) => {
      // console.log(res);
      this.data = res.data;
      this.dataSource = new MatTableDataSource(this.data);
      this.length = this.data.length;
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
  navigateEvalOne(row: any) {
    // console.log(row);
    this.router.navigate([
      './teacher/teacher/app-teacher-evaluation-one',
      row.sheet_name,
    ]);
  }
}
