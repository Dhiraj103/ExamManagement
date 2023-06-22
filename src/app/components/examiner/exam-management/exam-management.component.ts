import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort,Sort  } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { ExaminerPanelService } from 'src/app/services/examiner-panel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {LiveAnnouncer} from '@angular/cdk/a11y';

// import { ExaminerPanelService } from 'src/app/services/examiner-panel.service';
declare var $: any;
@Component({
  selector: 'app-exam-management',
  templateUrl: './exam-management.component.html',
  styleUrls: ['./exam-management.component.css'],
})
export class ExamManagementComponent implements OnInit {
  displayedColumns: string[] = [
    'exam_name',
    'class_name',
    'division_name',
    'subject_name',
    'year_name',
    'semester_name',
    'exam_date',
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

  constructor(
    private router: Router,
    private examinerMana: ExaminerPanelService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.getExaminerExamManagementList();
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

  examName: any;
  examDate: any;
  examDetailId: any;
  openDeleteExamModal(row: any) {
    // console.log(row);
    this.examName = row.exam_name;
    this.examDate = row.exam_date;
    this.examDetailId = row.exam_details_id;
    $('#exampleModal').modal('show'); // assuming you have jQuery and Bootstrap loaded
  }

  // define a method to delete the selected exam
  deleteSelectedExam() {
    this._deleteExam(this.examDetailId);
    $('#exampleModal').modal('hide');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getExaminerExamManagementList() {
    this.examinerMana.getExamList(this.data).subscribe((res) => {
      this.examinerExamManagementListData = res;
      this.examinerExamManagementList =
        this.examinerExamManagementListData.data;
      this.dataSource = new MatTableDataSource(this.examinerExamManagementList);
      this.length = this.examinerExamManagementList.length;
      // console.log(this.length);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      setTimeout(() => {
        this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.length;
      });
      // console.log(this.examinerExamManagementList);
      // this.id = this.examinerExamManagementList[0].exam_details_id;
      // console.log(this.id);
      // console.log(this.dataSource);
    });
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.getExaminerExamManagementList();
  }

  navigateToExaminerForm() {
    this.router.navigate(['examiner/examiner/app-examiner-form']);
  }

  _deleteExam(exam_details_id: any) {
    // console.log(exam_details_id);

    this.examinerMana.deleteExam({ exam_details_id }).subscribe(
      (res) => {
        // console.log(exam_details_id);
        // console.log(res);
        this.getExaminerExamManagementList();
        this.openSnackBar('Exam Deleted Successfully!', 'dismiss');
      },
      (err) => {
        console.error(err);
      }
    );
  }

  _editExam(exam_details_id: any) {
    // console.log(exam_details_id);
    if (exam_details_id) {
      this.router.navigate(
        ['examiner/examiner/app-edit-exam', exam_details_id],
        {
          relativeTo: this.route,
        }
      );
    } else {
      console.error('Error: id is undefined');
    }
  }
}
