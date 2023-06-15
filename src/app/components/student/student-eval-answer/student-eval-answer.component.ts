import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student-eval-answer',
  templateUrl: './student-eval-answer.component.html',
  styleUrls: ['./student-eval-answer.component.css'],
})
export class StudentEvalAnswerComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToEvalPaper() {
    this.router.navigate(['./student/student/app-student-eval-paper']);
  }

  navigateDashboard() {
    this.router.navigate(['./student/student/app-student-dashboard']);
  }
}
