import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
})
export class StudentDashboardComponent implements OnInit {
  selectbox: any;
  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.selectbox = this.fb.group({
      // exam_name: ['', Validators.compose([Validators.required])],
      subject: ['', Validators.compose([Validators.required])],
      class: ['', Validators.compose([Validators.required])],
    });
  }

  navigateToEvalAns() {
    this.router.navigate(['./student/student/app-student-eval-answer']);
  }
}
