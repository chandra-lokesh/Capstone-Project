import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { TopGainersLosersComponent } from './top-gainers-losers/top-gainers-losers.component';
import { UserDetailsComponent } from './user-details/user-details.component';

// import { ChartsModule } from 'ng2-charts';

// import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
// import { Label } from 'ng2-charts';



// import { ChartsModule } from 'ng2-charts'; // Import ChartsModule

import {Chart} from 'chart.js';
// import { createChart } from 'lightweight-charts';


import { ChartComponent } from './chart/chart.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StockCardComponent } from './stock-card/stock-card.component';
import { SentimentComponent } from './sentiment/sentiment.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NewsFeedComponent, TopGainersLosersComponent,
    CommonModule,NavBarComponent,FooterComponent, RouterModule, LoginComponent,
    FormsModule,UserDetailsComponent,ChartComponent, RouterLinkActive, HomePageComponent,SentimentComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent  {
  title = 'stockbridge-angular';
  
}



 


