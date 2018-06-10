import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesDisplayAndInputComponent } from './messages-display-and-input.component';

describe('MessagesDisplayAndInputComponent', () => {
  let component: MessagesDisplayAndInputComponent;
  let fixture: ComponentFixture<MessagesDisplayAndInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesDisplayAndInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesDisplayAndInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
