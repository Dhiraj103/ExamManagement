import { AddAnswerSheetComponent } from './add-answer-sheet/add-answer-sheet.component';
import { ScannerDashboardComponent } from './scanner-dashboard/scanner-dashboard.component';
import { ScannerComponent } from './scanner.component';
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
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { ScannerProfileComponent } from './scanner-profile/scanner-profile.component';
const routes: Routes = [
  { path: '', redirectTo: 'scanner', pathMatch: 'full' },
  {
    path: 'scanner',
    component: ScannerComponent,
    children: [
      { path: 'app-scanner-profile', component: ScannerProfileComponent },
      { path: 'app-scanner-dashboard', component: ScannerDashboardComponent },
      { path: 'app-add-answer-sheet', component: AddAnswerSheetComponent },
    ],
  },
];

@NgModule({
  declarations: [
    ScannerProfileComponent,
    ScannerDashboardComponent,
    AddAnswerSheetComponent,
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
export class ScannerModule {}
