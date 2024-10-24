import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsByDateComponent } from './payments-by-date.component';

describe('PaymentsByDateComponent', () => {
  let component: PaymentsByDateComponent;
  let fixture: ComponentFixture<PaymentsByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentsByDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
