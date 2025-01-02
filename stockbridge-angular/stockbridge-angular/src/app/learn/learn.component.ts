import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BarComponent } from '../bar/bar.component';
import { FooterComponent } from '../footer/footer.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { SentimentComponent } from '../sentiment/sentiment.component';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [CommonModule, NavBarComponent,SentimentComponent, FooterComponent],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.css'
})
export class LearnComponent {

  learningWebsites = [
    { name: 'Investopedia', url: 'https://www.investopedia.com/' },
    { name: 'NSE India', url: 'https://www.nseindia.com/' },
    { name: 'MoneyControl', url: 'https://www.moneycontrol.com/' },
    { name: 'TradingView', url: 'https://www.tradingview.com/' },
    { name: 'Yahoo Finance', url: 'https://finance.yahoo.com/' }
  ];


  learningVideos = [
    { title: 'Stock Market Basics for Beginners', url: 'https://www.youtube.com/watch?v=Z3z9WyJUQz8' },
    { title: 'Technical Analysis for Stocks', url: 'https://www.youtube.com/watch?v=p7HKvqRI_Bo' },
    { title: 'How to Invest in Stocks', url: 'https://www.youtube.com/watch?v=Zz5sHM_e0_g' },
    { title: 'Stock Market Crash Course', url: 'https://www.youtube.com/watch?v=d8n0qK1wRn8' }
  ];

}
