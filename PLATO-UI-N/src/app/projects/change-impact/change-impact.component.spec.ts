import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeImpactComponent } from './change-impact.component';

describe('ChangeImpactComponent', () => {
  let component: ChangeImpactComponent;
  let fixture: ComponentFixture<ChangeImpactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeImpactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeImpactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
