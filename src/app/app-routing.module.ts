import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',canActivate:[AuthGuard],
    loadChildren: () =>
      import('./components/admin/admin.module').then((mod) => mod.AdminModule),
  },
  {
    path: 'examiner',canActivate:[AuthGuard],
    loadChildren: () =>
      import('./components/examiner/examiner.module').then(
        (mod) => mod.ExaminerModule
      ),
  },
  {
    path: 'teacher',canActivate:[AuthGuard],
    loadChildren: () =>
      import('./components/teacher/teacher.module').then(
        (mod) => mod.TeacherModule
      ),
  },
  {
    path: 'scanner',canActivate:[AuthGuard],
    loadChildren: () =>
      import('./components/scanner/scanner.module').then(
        (mod) => mod.ScannerModule
      ),
  },
  {
    path: 'student',canActivate:[AuthGuard],
    loadChildren: () =>
      import('./components//student/student.module').then(
        (mod) => mod.StudentModule
      ),
  },
  { path: '**', component: NotfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
