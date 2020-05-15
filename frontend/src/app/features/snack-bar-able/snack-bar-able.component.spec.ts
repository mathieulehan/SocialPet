import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarAbleComponent } from './snack-bar-able.component';

describe('SnackBarAbleComponent', () => {
  let component: SnackBarAbleComponent;
  let fixture: ComponentFixture<SnackBarAbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackBarAbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarAbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
