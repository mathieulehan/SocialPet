import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RgpdDialogComponent } from './rgpd-dialog.component';

describe('RgpdDialogComponent', () => {
  let component: RgpdDialogComponent;
  let fixture: ComponentFixture<RgpdDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RgpdDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RgpdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
