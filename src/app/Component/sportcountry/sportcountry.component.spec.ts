import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportcountryComponent } from './sportcountry.component';

describe('SportcountryComponent', () => {
  let component: SportcountryComponent;
  let fixture: ComponentFixture<SportcountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportcountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportcountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
