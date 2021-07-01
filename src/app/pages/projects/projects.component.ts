import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProjectsService } from "app/_services/projects.service";
import { ToastrService } from "ngx-toastr";

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

  storeProjects() {}

  editProjects() {}
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
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-" + from + "-" + align,
      }
    );
  }
}
