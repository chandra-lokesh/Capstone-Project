import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-sentiment',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './sentiment.component.html',
  styleUrl: './sentiment.component.css'
})


export class SentimentComponent implements OnInit {
  // @Input() symbol: string='IBM'
  @Input() symbol!: string;
  sentimentData: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const apiUrl = `https://financialmodelingprep.com/api/v3/rating/${this.symbol}?apikey=6nby4MIMp5WNjKThVtbMnCGoWSLjjQMC`;
    this.http.get(apiUrl).subscribe((data: any) => {
      if (data && data.length > 0) {
        this.sentimentData = data[0]; 
      }
    });
  }

  getScores() {
    return [
      { key: 'DCF', value: this.sentimentData?.ratingDetailsDCFScore, recommendation: this.sentimentData?.ratingDetailsDCFRecommendation },
      { key: 'ROE', value: this.sentimentData?.ratingDetailsROEScore, recommendation: this.sentimentData?.ratingDetailsROERecommendation },
      { key: 'ROA', value: this.sentimentData?.ratingDetailsROAScore, recommendation: this.sentimentData?.ratingDetailsROARecommendation },
      { key: 'DE', value: this.sentimentData?.ratingDetailsDEScore, recommendation: this.sentimentData?.ratingDetailsDERecommendation },
      { key: 'PE', value: this.sentimentData?.ratingDetailsPEScore, recommendation: this.sentimentData?.ratingDetailsPERecommendation },
      { key: 'PB', value: this.sentimentData?.ratingDetailsPBScore, recommendation: this.sentimentData?.ratingDetailsPBRecommendation },
    ];
  }

  getBarColor(recommendation: string): string {
    switch (recommendation) {
      case 'Strong Buy':
        return '#006400'; 
      case 'Buy':
        return '#90EE90'; 
      case 'Neutral':
        return '#808080'; 
      case 'Sell':
        return '#FF7F7F'; 
      case 'Strong Sell':
        return '#8B0000'; 
      default:
        return '#D3D3D3'; 
    }
  }
}

  








