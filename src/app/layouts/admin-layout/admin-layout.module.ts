import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { AdminLayoutRoutes } from "./admin-layout.routing";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserComponent } from "../../pages/user/user.component";
import { IconsComponent } from "../../pages/icons/icons.component";

import { NotificationsComponent } from "../../pages/notifications/notifications.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ProfilesComponent } from "../../pages/profiles/profiles.component";
import { ProjectsComponent } from "../../pages/projects/projects.component";
import { LoginComponent } from "app/pages/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    IconsComponent,
    NotificationsComponent,
    ProfilesComponent,
    ProjectsComponent,
    LoginComponent,
  ],
  // exports: [ReactiveFormsModule],
})
export class AdminLayoutModule {}
