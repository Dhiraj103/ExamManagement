import { AnswerSheetsComponent } from './answer-sheets/answer-sheets.component';
import { ResultManagementComponent } from './result-management/result-management.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ExaminerComponent } from './examiner.component';
import { ExamManagementComponent } from './exam-management/exam-management.component';
import { ExaminerDashboardComponent } from './examiner-dashboard/examiner-dashboard.component';
import { ExaminerFormComponent } from './examiner-form/examiner-form.component';
import { EditExamComponent } from './edit-exam/edit-exam.component';

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
// import { HeaderExaminerComponent } from './header-examiner/header-examiner.component';
// import { SidebarExaminerComponent } from './sidebar-examiner/sidebar-examiner.component';
// import { SidebarComponent } from '../sidebar/sidebar.component';
// import { HeaderComponent } from '../header/header.component';
// import { HeaderComponent } from '../header/header.component';
// import { HeaderExaminerComponent } from './header-examiner/header-examiner.component';
const routes: Routes = [
  { path: '', redirectTo: 'examiner', pathMatch: 'full' },
  {
    path: 'examiner',
    component: ExaminerComponent,
    children: [
      { path: 'app-exam-management', component: ExamManagementComponent },
      { path: 'app-examiner-dashboard', component: ExaminerDashboardComponent },
      { path: 'app-result-management', component: ResultManagementComponent },
      { path: 'app-examiner-form', component: ExaminerFormComponent },
      { path: 'app-answer-sheets', component: AnswerSheetsComponent },
      { path: 'app-edit-exam/:id', component: EditExamComponent },
    ],
  },
];

@NgModule({
  declarations: [
    EditExamComponent,
    ExamManagementComponent,
    ExaminerDashboardComponent,
    ResultManagementComponent,
    ExaminerFormComponent,
    AnswerSheetsComponent,
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
export class ExaminerModule {}
