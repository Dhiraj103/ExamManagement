import { StudentComponent } from './components/student/student.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginService } from './services/login.service';

import { DatePipe } from '@angular/common';

import { ExaminerComponent } from './components/examiner/examiner.component';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ScannerComponent } from './components/scanner/scanner.component';
import { MaterialModule } from '../../material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { NotfoundComponent } from './components/notfound/notfound.component';

// import {MatFormFieldModule} from '@angular/material/form-field';
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    LoginComponent,
    ExaminerComponent,
    TeacherComponent,
    StudentComponent,
    SidebarComponent,
    HeaderComponent,
    ScannerComponent,
    NotfoundComponent
  ],
  providers: [LoginService, DatePipe],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  exports: [MaterialModule],
})
export class AppModule {}
