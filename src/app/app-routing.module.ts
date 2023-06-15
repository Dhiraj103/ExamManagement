import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/admin/admin.module').then((mod) => mod.AdminModule),
  },
  {
    path: 'examiner',
    loadChildren: () =>
      import('./components/examiner/examiner.module').then(
        (mod) => mod.ExaminerModule
      ),
  },
  {
    path: 'teacher',
    loadChildren: () =>
      import('./components/teacher/teacher.module').then(
        (mod) => mod.TeacherModule
      ),
  },
  {
    path: 'scanner',
    loadChildren: () =>
      import('./components/scanner/scanner.module').then(
        (mod) => mod.ScannerModule
      ),
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./components//student/student.module').then(
        (mod) => mod.StudentModule
      ),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
