import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentEvalAnswerComponent } from './student-eval-answer/student-eval-answer.component';
import { StudentEvalPaperComponent } from './student-eval-paper/student-eval-paper.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  MatOption,
  MatOptionModule,
} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { StudentComponent } from './student.component';
import { MaterialModule } from 'material.module';
const routes: Routes = [
  { path: '', redirectTo: 'student', pathMatch: 'full' },
  {
    path: 'student',
    component: StudentComponent,
    children: [
      { path: 'app-student-profile', component: StudentProfileComponent },
      { path: 'app-student-eval-paper', component: StudentEvalPaperComponent },
      {
        path: 'app-student-eval-answer',
        component: StudentEvalAnswerComponent,
      },
      { path: 'app-student-dashboard', component: StudentDashboardComponent },
    ],
  },
];
@NgModule({
  declarations: [
    StudentProfileComponent,
    StudentEvalPaperComponent,
    StudentEvalAnswerComponent,
    StudentDashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
})
export class StudentModule {}
