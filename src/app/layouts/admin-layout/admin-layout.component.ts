import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ROUTES } from "app/sidebar/sidebar.component";

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"],
})
export class AdminLayoutComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  public loginStyle;
  public display: boolean = false;

  constructor(location: Location) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    this.setStyle();
  }

  setStyle() {
    if (this.getTitle() == "/login") {
      this.display = false;
      this.loginStyle = { width: "100%", height: "100vh" };
    } else {
      this.display = true;
      this.loginStyle = {};
    }
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }

    return "/login";
  }

  ngDoCheck() {
    this.setStyle();
  }
}
