import { Component, OnInit, Type } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProjectsService } from "app/_services/projects.service";
import * as moment from "moment";

import { ToastrService } from "ngx-toastr";
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
    private toastr: ToastrService
  ) {}

  private projects: any = {};
  public message: string = "";
  moment = moment;

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects() {
    this.projectService.getProjects().subscribe(
      (resp: any) => {
        console.log("Successfully logged in");
        // console.log(resp.users);
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
  }

  removeProjects(project) {
    this.projectService.deleteProject(project.id).subscribe((res: any) => {
      console.log(res);
      this.fetchProjects();
      this.displayMsg("Record Delete Successfully", "top", "right");
    });
  }

  displayMsg(msg, from, align) {
    this.toastr.success(
      `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">${msg}</span>`,
      "",
      {
        timeOut: 2000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-" + from + "-" + align,
      }
    );
  }
}
