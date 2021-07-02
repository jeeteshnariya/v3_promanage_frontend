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
      name: "PRoject Name",
      start_date: "",
      due_date: "",
      description: "",
      status: "Completed",
      users: this.fb.group({
        name: "username",
        email: "user@rmail.com",
      }),
    });
  }

  saveProject() {
    console.log(this.projectForm.value);
    var id = this.data.project.id;
    this.projectService.updateProject(id, this.projectForm.value).subscribe(
      (resp: any) => {
        console.log(resp);
        this.projectService.displayMsg(resp.message);
        this.activeModal.close("Ok click");
      },
      (err) => {
        console.error("Error logging in", err);
      }
    );
  }
}
