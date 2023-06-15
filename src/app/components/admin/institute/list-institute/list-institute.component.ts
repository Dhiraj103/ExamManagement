import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { InstituteService } from 'src/app/services/institute.service';

@Component({
  selector: 'app-list-institute',
  templateUrl: './list-institute.component.html',
  styleUrls: ['./list-institute.component.css'],
})
export class ListInstituteComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'institute_name',
    'university',
    'logo',
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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _instituteService: InstituteService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.getInstitute();
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

  getInstitute() {
    const formData = new FormData();
    /* this.offset=this.pageIndex*10;
      console.log(this.offset);
      formData.append('offset',this.offset);*/

    this._instituteService.getInstituteList().subscribe((res) => {
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

    this.getInstitute();
  }

  editInstitute(id: any) {
    console.log(id);
    this.router.navigate(['../edit-institute', id], { relativeTo: this.route });
  }
}
