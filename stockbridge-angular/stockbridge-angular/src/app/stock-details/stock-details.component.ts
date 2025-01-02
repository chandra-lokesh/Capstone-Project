import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from '../chart/chart.component';
import { FooterComponent } from '../footer/footer.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { SentimentComponent } from '../sentiment/sentiment.component';
import { StockCardComponent } from '../stock-card/stock-card.component';

@Component({
  selector: 'app-stock-details',
  standalone: true,
  imports: [ChartComponent,StockCardComponent, NavBarComponent, FooterComponent,SentimentComponent],
  templateUrl: './stock-details.component.html',
  styleUrl: './stock-details.component.css'
})
export class StockDetailsComponent implements OnInit {
  symbol!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.symbol = this.route.snapshot.paramMap.get('symbol') || '';
    if (!this.symbol) {
      console.error("Symbol parameter is missing!");
      return;
    }
  }
}
