import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {MatTabGroup} from '@angular/material/tabs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ProgressSpinnerDialogComponent} from '../progress-spinner-dialog/progress-spinner-dialog-component';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit, AfterViewInit {
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private dialog: MatDialog) {
  }
  connectForm: FormGroup;
  registerForm: FormGroup;
  isSubmitted  =  false;
  @ViewChild('tabGroup') tabGroup: MatTabGroup;

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

  ngAfterViewInit(): void {}

  connect() {
    this.isSubmitted = true;
    if (this.connectForm.invalid) {
      return;
    }
    const dialogRef: MatDialogRef<ProgressSpinnerDialogComponent> = this.dialog.open(ProgressSpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this.authService.login(this.connectForm.value).then((user) => {
      localStorage.setItem('ACCESS_TOKEN', user.auth_token);
      this.authService.ensureAuthenticated(user.auth_token).then((response => {
        dialogRef.close();
      }));
    })
    .catch((err) => {
      console.log(err);
      dialogRef.close();
    });
    this.router.navigateByUrl('');
  }

  register() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const dialogRef: MatDialogRef<ProgressSpinnerDialogComponent> = this.dialog.open(ProgressSpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this.authService.register(this.registerForm.value)
      .then((user) => {
        dialogRef.close();
        this.tabGroup.selectedIndex = 0;
      })
      .catch((err) => {
        console.log(err);
        dialogRef.close();
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
