import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Chart, registerables } from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() symbol!: string;
  private chart: Chart | null = null;
  activePeriod: string = '1day';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchChartData('1day');
    console.log('stock chart', this.symbol);
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy(); 
    }
  }

  fetchChartData(period: string): void {
    this.activePeriod = period;
    if (this.chart) {
      this.chart.destroy(); // Destroy the previous chart if it exists before creating a new one.
    }

    let apiUrl = '';

    const currentDate = new Date();
    const toDate = currentDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    function getFromDate(days: number) {
      const fromDate = new Date();
      fromDate.setDate(currentDate.getDate() - days); 
      return fromDate.toISOString().split('T')[0]; 
    }

    

    if (period === '1day') {
      apiUrl = `https://financialmodelingprep.com/api/v3/historical-chart/1min/${
        this.symbol
      }?from=${getFromDate(
        1
      )}&to=${toDate}&apikey=vyrIEeTGSnS7SfBrtd4L5CqL7El8jP6B`;
    } else if (period === '1week') {
      apiUrl = `https://financialmodelingprep.com/api/v3/historical-chart/5min/${
        this.symbol
      }?from=${getFromDate(
        7
      )}&to=${toDate}&apikey=UHpFhJeavsw3ALDKVE2cCClCN69Fcskq`;
    } else if (period === '1month') {
      apiUrl = `https://financialmodelingprep.com/api/v3/historical-chart/30min/${
        this.symbol
      }?from=${getFromDate(
        30
      )}&to=${toDate}&apikey=UHpFhJeavsw3ALDKVE2cCClCN69Fcskq`;
    } else if (period === '1year') {
      apiUrl = `https://financialmodelingprep.com/api/v3/historical-chart/1hour/${
        this.symbol
      }?from=${getFromDate(
        365
      )}&to=${toDate}&apikey=UHpFhJeavsw3ALDKVE2cCClCN69Fcskq`;
    }

    
    this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        if (response && response.length) {
          const labels = response.map((item) =>
            new Date(item.date).toLocaleDateString()
          );
          const closePrices = response.map((item) => item.close);

          this.updateChart(labels, closePrices, period);
        } else {
          console.error('API returned no data');
        }
      },
      (error) => {
        console.error('Error fetching API data', error);
      }
    );
  }

  updateChart(labels: string[], data: number[], period: string): void {
    const reversedLabels = labels.reverse();
    const reversedData = data.reverse();

    
    let currentChart = Chart.getChart('chartCanvas');

    this.chart = new Chart('chartCanvas', {
      type: 'line',
      data: {
        labels: reversedLabels,
        datasets: [
          {
            label: `Close Prices (${period})`,
            data: reversedData,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            grid: {
              display: false, 
            },
            ticks: {
              display: false, 
            },
          },
          y: {
            grid: {
              display: false, 
            },
          },
        },
      },
    });
  }
}
