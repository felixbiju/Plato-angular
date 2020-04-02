import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendReportComponent } from './trend-report.component';

describe('TrendReportComponent', () => {
  let component: TrendReportComponent;
  let fixture: ComponentFixture<TrendReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
