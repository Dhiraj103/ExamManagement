import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css'],
})
export class ScannerComponent implements OnInit {
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
