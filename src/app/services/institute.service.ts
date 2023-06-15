import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InstituteService {
  constructor(private http: HttpClient) {}

  getInstituteList() {
    return this.http.get(`${environment.baseurl}get_institute_list`);
  }

  saveInstitute(data: any) {
    return this.http.post(`${environment.baseurl}add_institute`, data);
  }

  editInstitute(data: any) {
    return this.http.post(`${environment.baseurl}get_institute`, data);
  }

  updateInstitute(data: any) {
    return this.http.post(`${environment.baseurl}update_institute`, data);
  }
}
