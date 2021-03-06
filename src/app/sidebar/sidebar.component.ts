import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "app/_services/auth.service";

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "Dashboard", icon: "nc-bank", class: "" },
  { path: "/icons", title: "Icons", icon: "nc-diamond", class: "" },
  { path: "/maps", title: "Maps", icon: "nc-pin-3", class: "" },
  {
    path: "/notifications",
    title: "Notifications",
    icon: "nc-bell-55",
    class: "",
  },
  { path: "/user", title: "User Profile", icon: "nc-single-02", class: "" },
  { path: "/profiles", title: "Profiles", icon: "nc-bag-16", class: "" },
  { path: "/projects", title: "Projects", icon: "nc-app", class: "" },
  { path: "/table", title: "Table List", icon: "nc-tile-56", class: "" },
  {
    path: "/typography",
    title: "Typography",
    icon: "nc-caps-small",
    class: "",
  },
  {
    path: "",
    title: "Log out",
    icon: "nc-share-66",
    class: "active-pro",
  },
];

@Component({
  moduleId: module.id,
  selector: "sidebar-cmp",
  templateUrl: "sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  constructor(private authService: AuthService, public router: Router) {}
  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }

  logout(menuItem) {
    console.log(menuItem);
    if (menuItem.title == "Log out") {
      this.authService.logout().subscribe(
        (resp) => {
          console.log("Successfully logout");

          console.log(resp);
          this.router.navigate([""]);
        },
        (err) => {
          console.error("Error logging in", err);
        }
      );
    }
  }
}
