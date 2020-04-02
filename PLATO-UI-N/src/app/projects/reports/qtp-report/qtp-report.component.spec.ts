import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QtpReportComponent } from './qtp-report.component';

describe('QtpReportComponent', () => {
  let component: QtpReportComponent;
  let fixture: ComponentFixture<QtpReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QtpReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QtpReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
