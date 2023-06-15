import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student-eval-paper',
  templateUrl: './student-eval-paper.component.html',
  styleUrls: ['./student-eval-paper.component.css'],
})
export class StudentEvalPaperComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToEvalAns() {
    this.router.navigate(['./student/student/app-student-eval-answer']);
  }
  navigateDashboard() {
    this.router.navigate(['./student/student/app-student-dashboard']);
  }
}
