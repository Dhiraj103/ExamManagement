import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ExaminerPanelService } from 'src/app/services/examiner-panel.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css'],
})
export class TeacherDashboardComponent implements OnInit {
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
  data: any;
  teacherListData: any;
  teacherList: any;
  dataSource: any;
  length: any;
  pageIndex: any;
  pageSize = 10;
  filterName: any = '';
  route: ActivatedRoute | null | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  teacher_id: any;
  constructor(
    private router: Router,
    private _examiner_panel: ExaminerPanelService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.getExamDetails();
    this.dataSource.sort = this.sort;
  }
  navigateCreateSubject() {
    this.router.navigate(['./teacher/teacher/app-teacher-create-subject']);
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
  announceSortChange(sortState: Sort) { 
    if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }
}

  getExamDetails() {
    this._examiner_panel.getExamList(this.data).subscribe((res) => {
      // console.log(res);
      this.teacherListData = res;
      this.teacherList = this.teacherListData.data;
      this.dataSource = new MatTableDataSource(this.teacherList);
      this.length = this.teacherList.length;
      // console.log(this.length);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      setTimeout(() => {
        this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.length;
      });
      // console.log(this.teacherList);
      // this.id = this.examinerExamManagementList[0].exam_details_id;
      // console.log(this.id);
      // console.log(this.dataSource);
    });
  }

  _addQue(exam_details_id: any, create_exam_id: any) {
    // console.log(create_exam_id);
    if (exam_details_id || create_exam_id) {
      this.router.navigate(
        [
          './teacher/teacher/app-teacher-create-subject',

          create_exam_id,
          exam_details_id,
        ],
        {
          relativeTo: this.route,
        }
      );
    } else {
      console.error('Error: id is undefined');
    }
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.getExamDetails();
  }
}
