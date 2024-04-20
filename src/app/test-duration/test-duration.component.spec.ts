import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDurationComponent } from './test-duration.component';

describe('TestDurationComponent', () => {
  let component: TestDurationComponent;
  let fixture: ComponentFixture<TestDurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDurationComponent]
    });
    fixture = TestBed.createComponent(TestDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
