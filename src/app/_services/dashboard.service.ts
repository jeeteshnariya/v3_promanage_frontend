import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  public _url: string = "";
  public pieChartData: any = [];
  barData: any;

  constructor(public http: HttpClient) {
    this._url = environment.baseUrl;
  }

  getDashboardData(): Observable<any[]> {
    return this.http.get<any[]>(this._url + "/dashboard");
  }

  get pieChart() {
    return {
      type: "pie",
      data: {
        labels: [3, 2, 1, 0],
        datasets: [
          {
            label: "Tables Data",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: ["#e3e3e3", "#4acccd", "#fcc468", "#ef8157"],
            borderWidth: 0,
            data: this.pieChartData,
          },
        ],
      },

      options: {
        legend: {
          display: false,
        },

        pieceLabel: {
          render: "percentage",
          fontColor: ["white"],
          precision: 2,
        },

        tooltips: {
          enabled: false,
        },

        scales: {
          yAxes: [
            {
              ticks: {
                display: false,
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: "rgba(255,255,255,0.05)",
              },
            },
          ],

          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(255,255,255,0.1)",
                zeroLineColor: "transparent",
              },
              ticks: {
                display: false,
              },
            },
          ],
        },
      },
    };
  }

  get barChart() {
    return {
      type: "bar",
      data: {
        labels: ["Project", "Users", "Task", "Files"],
        datasets: [
          {
            type: "bar",
            label: "Bar Dataset",
            data: this.barData,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
          },
          {
            type: "line",
            label: "Line Dataset",
            data: this.barData,
            fill: false,
            borderColor: "rgb(54, 162, 235)",
          },
        ],
      },
      options: {
        type: "scatter",
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      },
    };
  }
}
