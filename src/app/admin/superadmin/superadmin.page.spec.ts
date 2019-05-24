import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminPage } from './superadmin.page';

describe('SuperadminPage', () => {
  let component: SuperadminPage;
  let fixture: ComponentFixture<SuperadminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperadminPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
