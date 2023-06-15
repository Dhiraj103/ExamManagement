import { AdminStudentService } from './../../../../services/admin-student.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExaminerService } from 'src/app/services/examiner.service';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css'],
})
export class ListStudentComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'uid_number',
    'name',
    'email',
    'mobile',
    'date_of_birth',
    'Action',
  ];
  dataSource: any;
  users: any;
  result: any;
  offset: any = 0;
  userid: any = 2;
  pageSize = 10;
  pageIndex = 0;
  length = 0;
  filterName: any = '';
  oldArray: any;
  role: any = 4;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  data: any;

  constructor(
    private _examinerService: ExaminerService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private adminStudent: AdminStudentService
  ) {}

  ngAfterViewInit() {
    this.getStudent();
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

  getStudent() {
    const formData = new FormData();
    /* this.offset=this.pageIndex*10;
      console.log(this.offset);
      formData.append('offset',this.offset);*/
    // formData.append('role', this.role);
    this.adminStudent.fetchStudentData(this.data).subscribe((res) => {
      this.result = res;
      console.log(this.result);

      this.dataSource = new MatTableDataSource(this.result.data);
      this.length = this.result.data.length;
      console.log(this.length);
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

    this.getStudent();
  }

  editStudent(id: any) {
    console.log(id);
    this.router.navigate(['../edit-student', id], { relativeTo: this.route });
  }
}
