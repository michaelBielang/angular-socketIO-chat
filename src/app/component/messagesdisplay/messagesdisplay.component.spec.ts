import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesDisplayComponent } from './messagesdisplay.component';

describe('MessagesDisplayComponent', () => {
  let component: MessagesDisplayComponent;
  let fixture: ComponentFixture<MessagesDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
