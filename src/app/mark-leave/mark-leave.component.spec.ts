import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkLeaveComponent } from './mark-leave.component';

describe('MarkLeaveComponent', () => {
  let component: MarkLeaveComponent;
  let fixture: ComponentFixture<MarkLeaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkLeaveComponent]
    });
    fixture = TestBed.createComponent(MarkLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
