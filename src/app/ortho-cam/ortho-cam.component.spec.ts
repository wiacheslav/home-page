import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrthoCamComponent } from './ortho-cam.component';

describe('OrthoCamComponent', () => {
  let component: OrthoCamComponent;
  let fixture: ComponentFixture<OrthoCamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrthoCamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrthoCamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
