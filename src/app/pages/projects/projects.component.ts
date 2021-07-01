import { Component, OnInit } from "@angular/core";
import { ProjectsService } from "app/_services/projects.service";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"],
})
export class ProjectsComponent implements OnInit {

  constructor(private projectService: ProjectsService) {}

  private projects: any = {};
  public message: string = "";

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(){
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

  storeProjects() {
   
  }

  editProjects() {
    
  }
  removeProjects() {
    
  }
}
