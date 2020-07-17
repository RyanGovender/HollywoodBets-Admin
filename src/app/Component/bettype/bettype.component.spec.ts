import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BettypeComponent } from './bettype.component';

describe('BettypeComponent', () => {
  let component: BettypeComponent;
  let fixture: ComponentFixture<BettypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BettypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BettypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
