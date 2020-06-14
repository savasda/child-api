import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddTeachersComponent } from './modal-add-teachers.component';

describe('ModalAddTeachersComponent', () => {
  let component: ModalAddTeachersComponent;
  let fixture: ComponentFixture<ModalAddTeachersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddTeachersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
