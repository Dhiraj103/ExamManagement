import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: any;
  hide = true;
  result: any;
  res: any;
  email: string = '';
  password: string = '';

  constructor(
    private formbuilder: FormBuilder,
    private _loginservice: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.login = this.formbuilder.group({
      user_email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
    this.loginForm();
    this.checkStorage();
  }

  loginForm() {
    this.login = this.formbuilder.group({
      user_email: [
        '',
        Validators.compose([
          Validators.required,
          //Validators.email
        ]),
      ],

      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  };

  checkStorage() {
    var data = localStorage.getItem('role');
    console.log(data);
    /*if(!this._loginservice.getLoggedInUser()){
      this.router.navigate(['/login']);
      return false;
    }else{
      this.router.navigate(['/admin/dashboard']);
      return true;
    }*/
    //this._loginservice.logout();
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('email', this.login.value.user_email);
    formData.append('password', this.login.value.password);

    // this._loginservice.login(formData).subscribe( (res: any) => {
    //     //console.log(res);
    //     this.result = res;
    //     if(this.result.success === true){
    //       console.log(this.result.data.role);
    //       var role = this.result.data.role;

    //       localStorage.setItem('user_id',this.result.data.id);
    //       localStorage.setItem('name',this.result.data.name);
    //       localStorage.setItem('email',this.result.data.email);
    //       localStorage.setItem('role',this.result.data.role);

    //       if(role == 1 || role == 2 || role == 3 || role == 4 || role == 5){
    //         this.router.navigate(['/admin/admin'],  { relativeTo: this.route });
    //       }else{
    //         this.router.navigate(['/login'],  { relativeTo: this.route });
    //       }

    //     }else{
    //       this.router.navigate(['/login'],  { relativeTo: this.route });
    //     }
    // }, error => {
    //   if(error.status === 400){
    //     this.router.navigate(['/login'],  { relativeTo: this.route });
    //   }
    // });

    this._loginservice.login(formData).subscribe(
      (res: any) => {
        //console.log(res);
        this.result = res;
        console.log(this.result);
        if (this.result.success === true) {
          console.log(this.result.data.role);
          var role = this.result.data.role;

          localStorage.setItem('user_id', this.result.data.id);
          localStorage.setItem('name', this.result.data.name);
          localStorage.setItem('email', this.result.data.email);
          localStorage.setItem('role', this.result.data.role);
          localStorage.setItem('uid', this.result.data.uid_number);
          localStorage.setItem('instituteId', this.result.data.institute_id);

          if (role == 1) {
            console.log('click');
            this.router.navigate(['/admin/admin/dashboard'], {
              relativeTo: this.route,
            });
          } else if (role == 2) {
            console.log('click');
            this.router.navigate(['/examiner/examiner/app-exam-management'], {
              relativeTo: this.route,
            });
          } else if (role == 3) {
            console.log('click');
            this.router.navigate(['/teacher/teacher/app-teacher-dashboard'], {
              relativeTo: this.route,
            });
          } else if (role == 4) {
            console.log('click');
            this.router.navigate(['/student/student/app-student-dashboard'], {
              relativeTo: this.route,
            });
          } else if (role == 5) {
            console.log('click');
            this.router.navigate(['/scanner/scanner/app-scanner-dashboard'], {
              relativeTo: this.route,
            });
          }
        } else {
          this.router.navigate(['/login'], { relativeTo: this.route });
        }
      },
      (error) => {
        if (error.status === 400) {
          this.router.navigate(['/login'], { relativeTo: this.route });
        }
      }
    );
    console.log(formData.getAll('email'));
    console.log(formData.getAll('password'));
  }
}
