import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketBetTypeComponent } from './market-bet-type.component';

describe('MarketBetTypeComponent', () => {
  let component: MarketBetTypeComponent;
  let fixture: ComponentFixture<MarketBetTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketBetTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketBetTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
