import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveStocksComponent } from './active-stocks.component';

describe('ActiveStocksComponent', () => {
  let component: ActiveStocksComponent;
  let fixture: ComponentFixture<ActiveStocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveStocksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActiveStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
