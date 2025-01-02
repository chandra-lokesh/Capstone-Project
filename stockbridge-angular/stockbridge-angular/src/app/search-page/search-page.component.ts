import { Component } from '@angular/core';
import { ActiveStocksComponent } from '../active-stocks/active-stocks.component';
import { FooterComponent } from '../footer/footer.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ActiveStocksComponent, SearchBarComponent, NavBarComponent, FooterComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

}
