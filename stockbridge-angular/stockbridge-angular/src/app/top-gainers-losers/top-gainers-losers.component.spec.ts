import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopGainersLosersComponent } from './top-gainers-losers.component';

describe('TopGainersLosersComponent', () => {
  let component: TopGainersLosersComponent;
  let fixture: ComponentFixture<TopGainersLosersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopGainersLosersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopGainersLosersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
