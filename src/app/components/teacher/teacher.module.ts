import { TeacherAnswerSheetsComponent } from './teacher-answer-sheets/teacher-answer-sheets.component';
import { TeacherCreateSubjectComponent } from './teacher-create-subject/teacher-create-subject.component';
import { TeacherCreateSubjectQuestionComponent } from './teacher-create-subject-question/teacher-create-subject-question.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherEvaluationOneComponent } from './teacher-evaluation-one/teacher-evaluation-one.component';
import { TeacherEvaluationPaperComponent } from './teacher-evaluation-paper/teacher-evaluation-paper.component';
import { TeacherQuesManagementComponent } from './teacher-ques-management/teacher-ques-management.component';
import { TeacherComponent } from './teacher.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

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
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { HeaderComponent } from '../header/header.component';

const routes: Routes = [
  { path: '', redirectTo: 'teacher', pathMatch: 'full' },
  {
    path: 'teacher',
    component: TeacherComponent,
    children: [
      {
        path: 'app-teacher-ques-management',
        component: TeacherQuesManagementComponent,
      },
      {
        path: 'app-teacher-evaluation-paper/:name/:sheet',
        component: TeacherEvaluationPaperComponent,
      },
      {
        path: 'app-teacher-evaluation-one/:id',
        component: TeacherEvaluationOneComponent,
      },
      { path: 'app-teacher-dashboard', component: TeacherDashboardComponent },
      {
        path: 'app-teacher-create-subject-question/:id',
        component: TeacherCreateSubjectQuestionComponent,
      },
      {
        path: 'app-teacher-create-subject/:subjectId/:id',
        component: TeacherCreateSubjectComponent,
      },
      {
        path: 'app-teacher-answer-sheets',
        component: TeacherAnswerSheetsComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [
    TeacherQuesManagementComponent,
    TeacherEvaluationPaperComponent,
    TeacherEvaluationOneComponent,
    TeacherDashboardComponent,
    TeacherCreateSubjectQuestionComponent,
    TeacherCreateSubjectComponent,
    TeacherAnswerSheetsComponent,
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
export class TeacherModule {}
