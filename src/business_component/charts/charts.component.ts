import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions, registerables } from 'chart.js';
import { SAMPLE_DATA } from '../../assets/sampleData';

interface WeekData {
  week: string;          
  weekLabel: string;     
  month: string;         
  monthLabel: string;   
}

interface ChartData {
  week: string;
  gmDollars: number;
  salesDollars: number;
  gmPercent: number;
}
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})

export class ChartsComponent {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart!: Chart;
   calender: WeekData[] = SAMPLE_DATA.calendar;
   chartData : ChartData[] = SAMPLE_DATA.chart;
    getWeeksFromCalendar(): string[] {
    return this.calender.map(item => item.week);
    }
    getgmDollarsFromChartData(): number[] {
      return this.chartData.map(item => item.gmDollars);
      }
      getgmPerFromChartData(): number[] {
        return this.chartData.map(item => item.gmPercent);
        }

    weekList : any = this.getWeeksFromCalendar();
   gmDollarsList : any = this.getgmDollarsFromChartData();
   gmPercentList : any = this.getgmPerFromChartData();
  ngAfterViewInit() {
    Chart.register(...registerables);
    this.createChart();
  }
  
  createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels:this.weekList,
        datasets: [
          {
            type: 'bar',
            label: 'GM Dollars',
            data: this.gmDollarsList,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            yAxisID: 'y'
          },
          {
            type: 'line',
            label: 'GM %',
            data: this.gmPercentList,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderWidth: 2,
            tension: 0.3,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            position: 'left',
            title: { display: true, text: 'GM Dollars ($)' }
          },
          y1: {
            beginAtZero: true,
            position: 'right',
            title: { display: true, text: 'GM %' },
            grid: { drawOnChartArea: false }
          }
        },
        plugins: {
          legend: { display: true }
        }
      } as ChartOptions
    });
  }

}
