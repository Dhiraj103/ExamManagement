import { Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
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
  title = 'viaexam';
}
