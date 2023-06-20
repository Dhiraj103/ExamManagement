import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router: Router) {}

  logout() {
    // Perform logout logic here
    // Example: Clear authentication tokens, reset session data
    
    localStorage.removeItem('user_id');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('uid');
    localStorage.removeItem('instituteId');

    // Navigate to the login page
    this.router.navigate(['/login']);
}

islogedIn(){
  if(localStorage.getItem('user_id')!==null){
    return true;
  }else{
    return false;
  }
}
}
