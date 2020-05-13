import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from "@angular/router";

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
    this.authService.signIn(this.connectForm.value);
    this.router.navigateByUrl('');
  }

  register() {
  }

  private initConnectForm() {
    this.connectForm = this.fb.group({
      emailControl: ['', Validators.required],
      passwordControl: ['', Validators.required]
    });
  }

  private initRegisterForm() {
    this.registerForm = this.fb.group({
      nameControl: ['', Validators.required],
      lastNameControl: ['', Validators.required],
      emailControl: ['', Validators.required],
      passwordControl: ['', Validators.required],
      passwordConfirmControl: ['', [Validators.required, ConnectionComponent.matchValues('passwordControl')]]
    });
    this.registerForm.controls.passwordControl.valueChanges.subscribe(() => {
      this.registerForm.controls.passwordConfirmControl.updateValueAndValidity();
    });
  }
}
