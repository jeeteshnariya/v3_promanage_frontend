import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserComponent } from "../../pages/user/user.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";

import { LoginComponent } from "../../pages/login/login.component";
import { ProfilesComponent } from "app/pages/profiles/profiles.component";
import { ProjectsComponent } from "app/pages/projects/projects.component";
import { AuthGuard } from "app/_services/auth.guard";
import { ProjectoverviewComponent } from "app/pages/projectoverview/projectoverview.component";

export const AdminLayoutRoutes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: "login", component: LoginComponent },
  { path: "user", component: UserComponent },
  { path: "profiles", component: ProfilesComponent },
  { path: "projects", component: ProjectsComponent },
  { path: "projectoverview", component: ProjectoverviewComponent },
  { path: "icons", component: IconsComponent },
  { path: "notifications", component: NotificationsComponent },
];
