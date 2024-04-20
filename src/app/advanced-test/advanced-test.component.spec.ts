import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedTestComponent } from './advanced-test.component';

describe('AdvancedTestComponent', () => {
  let component: AdvancedTestComponent;
  let fixture: ComponentFixture<AdvancedTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvancedTestComponent]
    });
    fixture = TestBed.createComponent(AdvancedTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
