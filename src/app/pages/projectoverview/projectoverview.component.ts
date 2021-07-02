import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ProjectsService } from "app/_services/projects.service";
import { TosterService } from "app/_services/toster.service";
import * as moment from "moment";

@Component({
  selector: "app-projectoverview",
  templateUrl: "./projectoverview.component.html",
  styleUrls: ["./projectoverview.component.css"],
})
export class ProjectoverviewComponent implements OnInit {
  public projectId: string = null;
  public project: any = null;
  active = 1;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectsService,
    private fb: FormBuilder,
    private tost: TosterService
  ) {}
  moment = moment;
  ngOnInit() {
    this.initForm();
    this.route.queryParams.subscribe((params) => {
      this.projectId = params["id"];
    });
    console.log(this.projectId);
    if (this.projectId) {
      this.fetchUserById();
    }
  }

  fetchUserById() {
    this.projectService.getProject(this.projectId).subscribe((res: any) => {
      // this.usersForm.patchValue(res.users[0]);
      this.project = res.projects[0];
    });
  }
  initForm() {
    return null;
  }
}
