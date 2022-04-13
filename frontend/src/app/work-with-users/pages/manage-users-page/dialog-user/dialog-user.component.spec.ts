import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdvancePaymentComponent } from './dialog-user.component';

describe('DialogAdvancePaymentComponent', () => {
  let component: DialogAdvancePaymentComponent;
  let fixture: ComponentFixture<DialogAdvancePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAdvancePaymentComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAdvancePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
