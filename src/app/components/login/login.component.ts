import {Component, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {Credentials} from '../../model/credentials';
import {AuthService} from '../../service/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  credentials: Credentials;
  credentialForm = new FormGroup ({
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(private authService: AuthService, private router: Router,
              private toastr: ToastsManager,
              private _vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(_vcr);
  }

  ngOnInit(){
    if(this.authService.loggedIn()) {
      this.router.navigateByUrl('/pizza/liste');
    }
  }

  onSubmit() {
    this.credentials = this.credentialForm.value;
    this.authService.login(this.credentials);
  }
}
