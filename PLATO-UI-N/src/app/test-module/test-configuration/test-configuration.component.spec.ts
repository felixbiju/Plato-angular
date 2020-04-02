import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestConfigurationComponent } from './test-configuration.component';

describe('TestConfigurationComponent', () => {
  let component: TestConfigurationComponent;
  let fixture: ComponentFixture<TestConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
