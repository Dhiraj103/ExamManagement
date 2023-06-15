import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ExaminerPanelService } from 'src/app/services/examiner-panel.service';
import { ScannerPanelService } from 'src/app/services/scanner-panel.service';
import { TeacherPanelService } from 'src/app/services/teacher-panel.service';

@Component({
  selector: 'app-teacher-evaluation-one',
  templateUrl: './teacher-evaluation-one.component.html',
  styleUrls: ['./teacher-evaluation-one.component.css'],
})
export class TeacherEvaluationOneComponent implements OnInit {
  displayedColumns: string[] = [
    'uid',
    'exam_name',
    'exam_date',
    'exam_no',
    'subject_name',
    'class_name',
    'division_name',
    'assign_date',
    // 'due_date',
    'status',
    'Action',
  ];

  // UID, Exam Name, Exam Date, Exam No., Subject, Class-Division, Assign Date, Due Date, Action

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
  answerSheetId: any;
  file: any;

  constructor(
    private router: Router,
    private examinerMana: ExaminerPanelService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private scannerSer: ScannerPanelService,
    private TeacherPanelService: TeacherPanelService,
    private ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.answerSheetId = this.ActivatedRoute.snapshot.params.id;
    // console.log(this.answerSheetId);
    this.getAnsSheets();
    // this.getAnswerSheets();
  }

  // getAnswerSheets() {
  //   const fromData = new FormData();
  //   fromData.append('role_id', '5');
  //   this.TeacherPanelService.getAssignedAns().subscribe((res: any) => {
  //     console.log(res);
  //     this.data = res.data;
  //     this.dataSource = new MatTableDataSource(this.data);
  //     this.length = this.data.length;
  //     console.log(this.length);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //     setTimeout(() => {
  //       this.paginator.pageIndex = this.pageIndex;
  //       this.paginator.length = this.length;
  //     });
  //   });
  // }

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

  getAnsSheets() {
    const formData = new FormData();
    formData.append('sheet_name', this.answerSheetId);
    this.TeacherPanelService.getAnsSheets(formData).subscribe((res: any) => {
      // console.log(res);
      this.data = res.data[0];
      this.file = res.file;
      console.log(this.data);
      this.dataSource = new MatTableDataSource(this.file);
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

    this.getAnsSheets();
  }

  navigateEvaluation(row: any, data: any) {
    // console.log(row);
    // console.log(data);
    this.router.navigate([
      './teacher/teacher/app-teacher-evaluation-paper',
      data.sheet_name,
      row.scanned_file,
    ]);
  }
}
