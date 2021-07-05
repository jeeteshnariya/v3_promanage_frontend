import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/_services/auth.service";
import { DashboardService } from "app/_services/dashboard.service";
import Chart from "chart.js";

@Component({
  selector: "dashboard-cmp",
  moduleId: module.id,
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartBar;
  public chartHours;
  public dash: any = { users: 0, files: 0, projects: 0, tasks: 0 };
  constructor(public dashSvc: DashboardService, public authSvc: AuthService) {}

  ngOnInit() {
    this.loadDashData();
    this.chartColor = "#FFFFFF";
  }

  loadDashData() {
    this.dashSvc.getDashboardData().subscribe(
      (res: any) => {
        console.log(res);
        this.dashSvc.chartData = res.data;
        this.dash.users = res.data[1];
        this.dash.projects = res.data[0];
        this.dash.files = res.data[3];
        this.dash.tasks = res.data[2];
        this.loadCharts();
      },
      (err: any) => console.log(err)
    );
  }

  loadCharts() {
    this.canvas = document.getElementById("chartEmail");
    this.ctx = this.canvas.getContext("2d");
    this.chartEmail = new Chart(this.ctx, this.dashSvc.pieChart);

    /**** */

    var barchart = document.getElementById("chartBar");

    this.chartBar = new Chart(barchart, this.dashSvc.barChart);
  }
}
