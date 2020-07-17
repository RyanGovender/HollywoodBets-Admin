import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportTreeComponent } from './sport-tree.component';

describe('SportTreeComponent', () => {
  let component: SportTreeComponent;
  let fixture: ComponentFixture<SportTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
