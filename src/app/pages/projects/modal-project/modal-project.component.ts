import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ProjectsService } from "app/_services/projects.service";

@Component({
  selector: "app-modal-project",
  templateUrl: "./modal-project.component.html",
  styleUrls: ["./modal-project.component.css"],
})
export class ModalProjectComponent implements OnInit {
  @Input() data;
  public mode: any = null;
  private projectForm: FormGroup;
  public message: any = null;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private projectService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.mode = this.data.mode;
    this.initForm();
    this.projectForm.patchValue(this.data.project);
  }

  initForm(): void {
    this.projectForm = this.fb.group({
      id: "",
      name: "New Application",
      start_date: "",
      due_date: "",
      description: "",
      technology: "",
      status: "Open",
      users: this.fb.group({
        name: "@username",
        email: "ex@domain.name",
      }),
    });
  }

  onSubmit() {
    if (this.mode === "add") {
      this.saveProject();
    } else {
      this.updateProject();
    }
  }

  saveProject() {
    this.projectService.createProject(this.projectForm.value).subscribe(
      (resp: any) => {
        console.log(resp);
        this.projectService.displayMsg(resp.message);
        this.activeModal.close("Ok click");
      },
      (err) => {
        console.error("Error logging in", err);
        this.message = err.error.errors;
      }
    );
  }

  updateProject() {
    var id = this.data.project.id;
    this.projectService.updateProject(id, this.projectForm.value).subscribe(
      (resp: any) => {
        console.log(resp);
        this.projectService.displayMsg(resp.message);
        this.activeModal.close("Ok click");
      },
      (err) => {
        console.error("Error logging in", err);
        this.message = err.error.errors;
      }
    );
  }
}
