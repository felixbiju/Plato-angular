import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalDebtComponent } from './technical-debt.component';

describe('TechnicalDebtComponent', () => {
  let component: TechnicalDebtComponent;
  let fixture: ComponentFixture<TechnicalDebtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalDebtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
