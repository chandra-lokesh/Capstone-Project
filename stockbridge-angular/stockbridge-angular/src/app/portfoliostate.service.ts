import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortfoliostateService {

  private readonly PORTFOLIO_ADDED_KEY = 'portfolioAdded';

  setPortfolioAdded(value: boolean) {
    localStorage.setItem(this.PORTFOLIO_ADDED_KEY, JSON.stringify(value));
  }

  isPortfolioAdded(): boolean {
    return JSON.parse(localStorage.getItem(this.PORTFOLIO_ADDED_KEY) || 'false');
  }
}
