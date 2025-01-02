import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStocksComponent } from './user-stocks.component';

describe('UserStocksComponent', () => {
  let component: UserStocksComponent;
  let fixture: ComponentFixture<UserStocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserStocksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
