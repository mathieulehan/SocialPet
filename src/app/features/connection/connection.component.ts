import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {
  constructor(private fb: FormBuilder) {
  }
  connectForm = this.fb.group({
    emailControl: ['', Validators.required],
    passwordControl: ['', Validators.required]
  });
  registerForm = this.fb.group({
    nameControl: ['', Validators.required],
    lastNameControl: ['', Validators.required],
    emailControl: ['', Validators.required],
    passwordControl: ['', Validators.required],
    passwordConfirmControl: ['', [Validators.required, ConnectionComponent.matchValues('passwordControl')]]
  });

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

  connect() {
  }

  register() {
  }

  ngOnInit(): void {
    this.registerForm.controls.passwordControl.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPasswordControl.updateValueAndValidity();
    });
  }
}
