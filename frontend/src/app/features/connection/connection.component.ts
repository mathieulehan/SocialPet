import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }
  connectForm: FormGroup;
  registerForm: FormGroup;
  isSubmitted  =  false;

  public static matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
      !!control.parent.value &&
      control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }

  ngOnInit(): void {
    this.initConnectForm();
    this.initRegisterForm();
  }

  connect() {
    this.isSubmitted = true;
    if (this.connectForm.invalid) {
      return;
    }
    this.authService.login(this.connectForm.value).then((user) => {
      console.log(user.auth_token)
      localStorage.setItem('ACCESS_TOKEN', user.auth_token);
    })
    .catch((err) => {
      console.log(err);
    });
    this.router.navigateByUrl('');
  }

  register() {
    this.isSubmitted = true;
    if (this.connectForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value)
      .then((user) => {
        localStorage.setItem('ACCESS_TOKEN', user.auth_token);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private initConnectForm() {
    this.connectForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  private initRegisterForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', [Validators.required, ConnectionComponent.matchValues('password')]]
    });
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.passwordConfirm.updateValueAndValidity();
    });
  }
}
