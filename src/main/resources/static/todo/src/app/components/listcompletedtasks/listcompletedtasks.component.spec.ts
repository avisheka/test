import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcompletedtasksComponent } from './listcompletedtasks.component';

describe('ListcompletedtasksComponent', () => {
  let component: ListcompletedtasksComponent;
  let fixture: ComponentFixture<ListcompletedtasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcompletedtasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcompletedtasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
