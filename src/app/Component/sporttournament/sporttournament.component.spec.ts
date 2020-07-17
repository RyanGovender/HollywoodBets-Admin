import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SporttournamentComponent } from './sporttournament.component';

describe('SporttournamentComponent', () => {
  let component: SporttournamentComponent;
  let fixture: ComponentFixture<SporttournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SporttournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SporttournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
