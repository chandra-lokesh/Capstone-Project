import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddPortfolioComponent } from '../add-portfolio/add-portfolio.component';
import { FooterComponent } from '../footer/footer.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { PortfolioCardComponent } from '../portfolio-card/portfolio-card.component';
import { PortfoliostateService } from '../portfoliostate.service';
import { UserFavouritesComponent } from '../user-favourites/user-favourites.component';
import { UserStocksComponent } from '../user-stocks/user-stocks.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AddPortfolioComponent,
    UserStocksComponent,
    UserFavouritesComponent,
    PortfolioCardComponent,
    NavBarComponent,
    FooterComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(public portfolioStateService: PortfoliostateService) {}
}
