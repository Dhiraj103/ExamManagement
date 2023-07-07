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
  logrole:any=localStorage.getItem('role');
  spinnerDisplay:boolean=false;
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
//if user is logged in then
if(this.isLoggedIn()){if (this.logrole == 1) {
  console.log('click');
  this.router.navigate(['/admin/admin/dashboard']);
} else if (this.logrole == 2) {
  console.log('click');
  this.router.navigate(['/examiner/examiner/app-exam-management']);
} else if (this.logrole == 3) {
  console.log('click');
  this.router.navigate(['/teacher/teacher/app-teacher-dashboard']);
} else if (this.logrole == 4) {
  console.log('click');
  this.router.navigate(['/student/student/app-student-dashboard']);
} else if (this.logrole == 5) {
  console.log('click');
  this.router.navigate(['/scanner/scanner/app-scanner-dashboard']);
}
} else {
this.router.navigate(['/login']);
}
    
  }
  isLoggedIn(){
      if(localStorage.getItem('role')!==null){
        return true;
      }else{
        return false;
      }
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
   if(this.login.valid)
   {
    this.spinnerDisplay=true;
    this._loginservice.login(formData).subscribe(
      (res: any) => {
        //console.log(res);

        this.result = res;
        console.log(this.result);

        if (this.result.success === true) {
          console.log(this.result.data.role);
          var role = this.result.data.role;
          localStorage.setItem('uid_number', this.result.data.uid_number);
          localStorage.setItem('user_id', this.result.data.id);
          localStorage.setItem('name', this.result.data.name);
          localStorage.setItem('email', this.result.data.email);
          localStorage.setItem('role', this.result.data.role);
          localStorage.setItem('uid', this.result.data.uid_number);
          localStorage.setItem('instituteId', this.result.data.institute_id);

          if (role == 1) {
            this.spinnerDisplay=false;
            console.log('click');
            this.router.navigate(['/admin/admin/dashboard'], {
              relativeTo: this.route,
            });
          } else if (role == 2) {
            this.spinnerDisplay=false;
            console.log('click');
            this.router.navigate(['/examiner/examiner/app-exam-management'], {
              relativeTo: this.route,
            });
          } else if (role == 3) {
            this.spinnerDisplay=false;
            console.log('click');
            this.router.navigate(['/teacher/teacher/app-teacher-dashboard'], {
              relativeTo: this.route,
            });
          } else if (role == 4) {
            this.spinnerDisplay=false;
            console.log('click');
            this.router.navigate(['/student/student/app-student-dashboard'], {
              relativeTo: this.route,
            });
          } else if (role == 5) {
            this.spinnerDisplay=false;
            console.log('click');
            this.router.navigate(['/scanner/scanner/app-scanner-dashboard'], {
              relativeTo: this.route,
            });
          }
        }  else {
         
          this.router.navigate(['/login'], { relativeTo: this.route });
          alert("Wrong Username Or Password");
          this.spinnerDisplay=false;

        }
      },
      (error) => {
        if (error.status === 400) {
          this.router.navigate(['/login'], { relativeTo: this.route });
        }
      }
    );
   }else {
    alert("Please enter username and password");
   }
    console.log(formData.getAll('email'));
    console.log(formData.getAll('password'));
  }
}
