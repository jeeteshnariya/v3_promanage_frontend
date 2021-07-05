import { Component, OnInit, Type } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "app/_services/auth.service";
import { ProjectsService } from "app/_services/projects.service";
import { TosterService } from "app/_services/toster.service";
import * as moment from "moment";

import { ModalProjectComponent } from "./modal-project/modal-project.component";
const MODALS: { [name: string]: Type<any> } = {
  autofocus: ModalProjectComponent,
};
@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"],
})
export class ProjectsComponent implements OnInit {
  constructor(
    private projectService: ProjectsService,
    private modalService: NgbModal,
    private tost: TosterService,
    private authSvc: AuthService
  ) {}

  public projects: any = null;
  public message: string = "";
  moment = moment;

  ngOnInit(): void {
    this.fetchProjects();
  }

  serchData(val) {
    let data = { search: val };
    // console.log(val);
    this.fetchProjects(data);
  }
  roleDisplay() {
    return this.authSvc.role == "student";
  }

  fetchProjects(data = null) {
    this.projectService.getProjects(data).subscribe(
      (resp: any) => {
        console.log(resp);
        this.projects = resp.projects;
      },
      (err) => {
        console.error("Error logging in", err);
        this.message = err.error.errors;
      }
    );
  }

  open(data) {
    const modalRef = this.modalService.open(MODALS["autofocus"]);
    modalRef.componentInstance.data = data;
    modalRef.result
      .then((result) => {
        console.log(result);
        this.fetchProjects();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  removeProjects(project) {
    this.projectService.deleteProject(project.id).subscribe((res: any) => {
      console.log(res);
      this.fetchProjects();
      this.tost.error(res.message);
    });
  }
}
