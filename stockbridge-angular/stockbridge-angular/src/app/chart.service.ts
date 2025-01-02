import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  
  constructor(private http: HttpClient) { }

  // Replace with your actual API
  getStockData(company: string, currentDate: string): Observable<any> {
    const dayUrl = `https://financialmodelingprep.com/api/v3/historical-chart/1day/${company}?from=2010-08-10&to=${currentDate}&apikey=pevGoECHGn8UiWcyOX81LFWoWxE0YRkA`;
    return this.http.get<any>(dayUrl);
  }
}
