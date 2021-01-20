import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderinstructionComponent } from './orderinstruction.component';

describe('OrderinstructionComponent', () => {
  let component: OrderinstructionComponent;
  let fixture: ComponentFixture<OrderinstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderinstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderinstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
