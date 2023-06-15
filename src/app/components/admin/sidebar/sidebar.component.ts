import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() sideNavStatus: boolean = false;

  ImgUrl = localStorage.getItem('imgUrl');
  username = localStorage.getItem('name');
  user_type = localStorage.getItem('user_type');
  role = localStorage.getItem('role');

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  redirectHome() {
    /* if (this.user_type == '1') this.router.navigate(['../crm/call-center']);
    if (this.user_type == '2') this.router.navigate(['../crm/admin-dashboard']);
    if (this.user_type == '3') this.router.navigate(['../crm/agent-dashboard']);*/
  }

  openDialog(): void {
    /*const dialogRef = this.dialog.open(LogOutComponent, {
      width: '350px',
      height: '212px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });*/
  }

  logout() {
    this.router.navigate(['/login'], { relativeTo: this.route });
  }
}
