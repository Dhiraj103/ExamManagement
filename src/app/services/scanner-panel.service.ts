import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScannerPanelService {
  constructor(private http: HttpClient) {}

  addAnswerSheet(data: any) {
    return this.http.post(`${environment.baseurl}add_answer_sheet_data`, data);
  }

  getScannerDashboardList(data: any) {
    return this.http.post(
      `${environment.baseurl}get_scanner_dashboard_list`,
      data
    );
  }

  addScannerProfile(data: any) {
    return this.http.post(`${environment.baseurl}add_scanner_data`, data);
  }

  changeScannerPassword(data: any) {
    return this.http.post(
      `${environment.baseurl}change_scanner_password`,
      data
    );
  }

  sendFolderToExaminer(data: any) {
    return this.http.post(`${environment.baseurl}send_to_examiner`, data);
  }
}
