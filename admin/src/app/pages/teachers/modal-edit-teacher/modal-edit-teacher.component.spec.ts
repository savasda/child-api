import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditTeacherComponent } from './modal-edit-teacher.component';

describe('ModalEditTeacherComponent', () => {
  let component: ModalEditTeacherComponent;
  let fixture: ComponentFixture<ModalEditTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
