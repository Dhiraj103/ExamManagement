import { AnswerSheetsComponent } from './../examiner/answer-sheets/answer-sheets.component';
import { ResultManagementComponent } from './../examiner/result-management/result-management.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageExaminerComponent } from './manage-examiner/manage-examiner.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

import { FooterComponent } from './footer/footer.component';
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
import { AddExaminerComponent } from './add-examiner/add-examiner.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { EditExaminerComponent } from './edit-examiner/edit-examiner.component';
import { ListTeacherComponent } from './teacher/list-teacher/list-teacher.component';
import { AddTeacherComponent } from './teacher/add-teacher/add-teacher.component';
import { EditTeacherComponent } from './teacher/edit-teacher/edit-teacher.component';
import { ListStudentComponent } from './student/list-student/list-student.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { EditStudentComponent } from './student/edit-student/edit-student.component';
import { ListScannerComponent } from './scanner/list-scanner/list-scanner.component';
import { AddScannerComponent } from './scanner/add-scanner/add-scanner.component';
import { EditScannerComponent } from './scanner/edit-scanner/edit-scanner.component';
import { ListInstituteComponent } from './institute/list-institute/list-institute.component';
import { AddInstituteComponent } from './institute/add-institute/add-institute.component';
import { EditInstituteComponent } from './institute/edit-institute/edit-institute.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { ExamManagementComponent } from '../examiner/exam-management/exam-management.component';
import { ExaminerDashboardComponent } from '../examiner/examiner-dashboard/examiner-dashboard.component';
import { ExaminerFormComponent } from '../examiner/examiner-form/examiner-form.component';
import { StudentDashboardComponent } from '../student/student-dashboard/student-dashboard.component';
import { StudentProfileComponent } from '../student/student-profile/student-profile.component';
import { StudentEvalAnswerComponent } from '../student/student-eval-answer/student-eval-answer.component';
import { StudentEvalPaperComponent } from '../student/student-eval-paper/student-eval-paper.component';
import { ScannerDashboardComponent } from '../scanner/scanner-dashboard/scanner-dashboard.component';
import { TeacherDashboardComponent } from '../teacher/teacher-dashboard/teacher-dashboard.component';
import { TeacherQuesManagementComponent } from '../teacher/teacher-ques-management/teacher-ques-management.component';
import { TeacherAnswerSheetsComponent } from '../teacher/teacher-answer-sheets/teacher-answer-sheets.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'list-examiner', component: ManageExaminerComponent },
      { path: 'add-examiner', component: AddExaminerComponent },
      { path: 'edit-examiner/:id', component: EditExaminerComponent },
      { path: 'list-teacher', component: ListTeacherComponent },
      { path: 'add-teacher', component: AddTeacherComponent },
      { path: 'edit-teacher/:id', component: EditTeacherComponent },
      { path: 'list-student', component: ListStudentComponent },
      { path: 'add-student', component: AddStudentComponent },
      { path: 'edit-student/:id', component: EditStudentComponent },
      { path: 'list-scanner', component: ListScannerComponent },
      { path: 'add-scanner', component: AddScannerComponent },
      { path: 'edit-scanner/:id', component: EditScannerComponent },
      { path: 'list-institute', component: ListInstituteComponent },
      { path: 'add-institute', component: AddInstituteComponent },
      { path: 'edit-institute/:id', component: EditInstituteComponent },
      { path: 'app-exam-management', component: ExamManagementComponent },
      { path: 'app-examiner-dashboard', component: ExaminerDashboardComponent },
      { path: 'app-result-management', component: ResultManagementComponent },
      { path: 'app-answer-sheets', component: AnswerSheetsComponent },
      { path: 'app-examiner-form', component: ExaminerFormComponent },
      { path: 'app-student-dashboard', component: StudentDashboardComponent },
      { path: 'app-student-profile', component: StudentProfileComponent },
      {
        path: 'app-student-eval-answer',
        component: StudentEvalAnswerComponent,
      },
      { path: 'app-student-eval-paper', component: StudentEvalPaperComponent },
      { path: 'app-scanner-dashboard', component: ScannerDashboardComponent },
      { path: 'app-teacher-dashboard', component: TeacherDashboardComponent },
      {
        path: 'app-teacher-ques-management',
        component: TeacherQuesManagementComponent,
      },
      {
        path: 'app-teacher-answer-sheets',
        component: TeacherAnswerSheetsComponent,
      },
    ],
  },
  { path: 'logout', component: AddExaminerComponent },
];

@NgModule({
  declarations: [
    DashboardComponent,
    ManageExaminerComponent,
    AdminComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AddExaminerComponent,
    EditExaminerComponent,
    ListTeacherComponent,
    AddTeacherComponent,
    EditTeacherComponent,
    ListStudentComponent,
    AddStudentComponent,
    EditStudentComponent,
    ListScannerComponent,
    AddScannerComponent,
    EditScannerComponent,
    ListInstituteComponent,
    AddInstituteComponent,
    EditInstituteComponent,
    AdminProfileComponent,
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
    MatSelectModule,
    MatSidenavModule,
  ],
})
export class AdminModule {}
