import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckImpactComponent } from './check-impact.component';

describe('CheckImpactComponent', () => {
  let component: CheckImpactComponent;
  let fixture: ComponentFixture<CheckImpactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckImpactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckImpactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
