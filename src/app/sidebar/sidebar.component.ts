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
  // { path: "/icons", title: "Icons", icon: "nc-diamond", class: "" },
  // {
  //   path: "/notifications",
  //   title: "Notifications",
  //   icon: "nc-bell-55",
  //   class: "",
  // },
  { path: "/profiles", title: "Users", icon: "nc-bag-16", class: "" },
  { path: "/user", title: "User Overview", icon: "nc-single-02", class: "" },
  { path: "/projects", title: "Projects", icon: "nc-app", class: "" },
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

  logout() {
    this.authService.logout().subscribe(
      (resp) => {
        console.log("Successfully logout");

        console.log(resp);
        this.router.navigate(["/login"]);
      },
      (err) => {
        console.error("Error logging in", err);
      }
    );
  }

  roledisplay(item) {
    const admin = ["/dashboard", "/profiles", "/user", "/projects"];
    const faculty = ["/dashboard", "/profiles", "/user", "/projects"];
    const studnet = ["/dashboard", "/projects"];
    const role = this.authService.role;
    if (role == "student") {
      return studnet.includes(item); // Returns true
    }
    if (role == "faculty") {
      return faculty.includes(item); // Returns true
    }
    if (role == "admin") {
      return admin.includes(item); // Returns true
    }
    return false;
  }
}
