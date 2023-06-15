import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-examiner',
  templateUrl: './examiner.component.html',
  styleUrls: ['./examiner.component.css'],
})
export class ExaminerComponent implements OnInit {
  sideNavStatus: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.sideBarToggle();
  }

  sideBarToggle() {}

  ngAfterViewInit(): void {
    if ($(window).width() < 767) {
      $('#accordionSidebar').addClass('toggled');
      $('#accordionSidebar li.nav-item .slidebarClik').click(function () {
        $('#accordionSidebar').addClass('toggled');
      });
    }
  }
}
