import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-examiner-dashboard',
  templateUrl: './examiner-dashboard.component.html',
  styleUrls: ['./examiner-dashboard.component.css'],
  
})

export class ExaminerDashboardComponent implements AfterViewInit {
  // displayedColumns: string[] = ['position', 'name', 'class', 'division','subject','year','semester','exam_date','action','publish'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  constructor(){}

  
}

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   class: number;
//   subject: string;
//   division:string;
//   year:number;
//   semester:string;
//   exam_date:number;
//   action:string;
//   publish:string
// }


// const ELEMENT_DATA: PeriodicElement[] = [
//   {position:1 , name:'addssf', class:1009 , subject:'dH', division:'b',year:123,semester:'12th', exam_date:123, action:'sdf',publish:'rffg'},
//   {position:1 , name:'vv', class:1009 , subject:'dH', division:'b',year:123,semester:'12th', exam_date:123, action:'sdf',publish:'rffg'},
//    {position:1 , name:'sbetv', class:1009 , subject:'dH', division:'b',year:123,semester:'12th', exam_date:123, action:'sdf',publish:'rffg'},
//    {position:1 , name:'rdvfxcogen', class:1009 , subject:'dH', division:'b',year:123,semester:'12th', exam_date:123, action:'sdf',publish:'rffg'},
// ];



