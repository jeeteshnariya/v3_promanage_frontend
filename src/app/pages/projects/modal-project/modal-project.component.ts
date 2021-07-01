import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-modal-project",
  templateUrl: "./modal-project.component.html",
  styleUrls: ["./modal-project.component.css"],
})
export class ModalProjectComponent implements OnInit {
  @Input() data;
  public mode: any = null;
  public project: any = null;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.mode = this.data.mode;
    this.project = this.data.project;
  }

  saveProject() {
    this.activeModal.close("Ok click");
  }
}
