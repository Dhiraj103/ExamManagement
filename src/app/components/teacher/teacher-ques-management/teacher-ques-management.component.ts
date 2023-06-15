import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ExaminerPanelService } from 'src/app/services/examiner-panel.service';
import { TeacherPanelService } from 'src/app/services/teacher-panel.service';

@Component({
  selector: 'app-teacher-ques-management',
  templateUrl: './teacher-ques-management.component.html',
  styleUrls: ['./teacher-ques-management.component.css'],
})
export class TeacherQuesManagementComponent implements OnInit {
  displayedColumns: string[] = [
    'exam_name',
    'class_name',
    'division_name',
    'subject_name',
    'year_name',
    'semester_name',
    'exam_date',
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
    private teacherPanel: TeacherPanelService
  ) {}
  ngOnInit(): void {
    this.getExamDetails();
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

  getExamDetails() {
    this._examiner_panel.getExamList(this.data).subscribe((res) => {
      console.log(res);
      this.teacherListData = res;
      this.teacherList = this.teacherListData.data;
      this.dataSource = new MatTableDataSource(this.teacherList);
      this.length = this.teacherList.length;
      console.log(this.length);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      setTimeout(() => {
        this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.length;
      });
      console.log(this.teacherList);
      // this.id = this.examinerExamManagementList[0].exam_details_id;
      // console.log(this.id);
      console.log(this.dataSource);
    });
  }
  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.getExamDetails();
  }

  editQues(id: any) {
    console.log(id);
    const formData = new FormData();
    formData.append('CreateSubject_id', id);
    this.router.navigate([
      './teacher/teacher/app-teacher-create-subject-question',
      id,
    ]);
  }
}
