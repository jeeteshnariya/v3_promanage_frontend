import { Component, EventEmitter, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/_services/auth.service";
import { FilesService } from "app/_services/files.service";
import { ProjectsService } from "app/_services/projects.service";
import { TasksService } from "app/_services/tasks.service";
import { TosterService } from "app/_services/toster.service";
import * as moment from "moment";
import {
  UploadOutput,
  UploadInput,
  UploadFile,
  humanizeBytes,
  UploaderOptions,
  UploadStatus,
} from "ngx-uploader";
@Component({
  selector: "app-projectoverview",
  templateUrl: "./projectoverview.component.html",
  styleUrls: ["./projectoverview.component.css"],
})
export class ProjectoverviewComponent implements OnInit {
  public projectId: string = null;
  public project: any = null;
  public tasks: any = null;
  public filesData: any = null;
  active = 1;
  private taskId: number = null;

  private taskForm: FormGroup;

  /**file uploder */
  url = "/api/uploads";
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  options: UploaderOptions;
  authHeader;
  /*file uploder end*/

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectsService,
    private fb: FormBuilder,
    private tost: TosterService,
    private taskService: TasksService,
    private fileService: FilesService,
    public authSvc: AuthService
  ) {
    this.authHeader = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    this.options = {
      concurrency: 1,
      maxUploads: 10,
      maxFileSize: 1000000,
    };
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
  }
  moment = moment;
  ngOnInit() {
    this.initForm();
    this.route.queryParams.subscribe((params) => {
      this.projectId = params["id"];
    });
    console.log(this.projectId);
    if (this.projectId) {
      this.fetchUserById();
      this.fetchTaskOfProject();
      this.fetchFilesOfProject();
    }
  }

  fetchUserById() {
    this.projectService.getProject(this.projectId).subscribe((res: any) => {
      // this.usersForm.patchValue(res.users[0]);
      this.project = res.projects[0];
    });
  }

  fetchTaskOfProject() {
    this.taskService.getTasksByProjectId(this.projectId).subscribe(
      (res: any) => {
        // console.log(res);
        this.tasks = res.tasks;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  fetchFilesOfProject() {
    this.fileService.geFilesByProjectId(this.projectId).subscribe(
      (res: any) => {
        // console.log(res);
        this.filesData = res.files;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  removeTask(id) {
    this.taskService.deleteTask(id).subscribe((res: any) => {
      console.log(res);
      this.fetchTaskOfProject();
      this.tost.error(res.message);
      this.initForm();
    });
  }
 
  initForm() {
    this.taskForm = this.fb.group({
      title: "",
      status: "Open",
      priority: "Low",
    });
    this.taskId = null;
  }

  statusChange(task){   
    this.taskForm.patchValue(task);
    this.taskForm.controls.status.setValue("Completed");
    this.updateTask(task.id);    
  }

  setTask(task) {
    this.taskForm.patchValue(task);
    this.taskId = task.id;
  }
  saveTask() {
    if (this.taskId) {
      this.updateTask(this.taskId);
    } else {
      this.addTask();
    }
  }

  updateTask(taskId) {
    var data = this.taskForm.value;
    data.project_id = parseInt(this.projectId);
    this.taskService.updateTask(taskId, data).subscribe(
      (res: any) => {
        // console.log(res);
        this.tost.success(res.message);
        this.fetchTaskOfProject();
        this.initForm();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  addTask() {
    var data = this.taskForm.value;
    data.project_id = parseInt(this.projectId);
    this.taskService.createTask(data).subscribe(
      (res: any) => {
        // console.log(res);
        this.tost.success(res.message);
        this.fetchTaskOfProject();
        this.initForm();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  /* file upload start */
  onUploadOutput(output: UploadOutput): void {
    if (output.type === "allAddedToQueue") {
      const event: UploadInput = {
        type: "uploadAll",
        url: this.url,
        method: "POST",
        data: { id: this.projectId },
        headers: this.authHeader,
      };

      this.uploadInput.emit(event);
    } else if (
      output.type === "addedToQueue" &&
      typeof output.file !== "undefined"
    ) {
      this.files.push(output.file);
    } else if (
      output.type === "uploading" &&
      typeof output.file !== "undefined"
    ) {
      const index = this.files.findIndex(
        (file) =>
          typeof output.file !== "undefined" && file.id === output.file.id
      );
      this.files[index] = output.file;
    } else if (output.type === "cancelled" || output.type === "removed") {
      this.files = this.files.filter(
        (file: UploadFile) => file !== output.file
      );
    } else if (output.type === "dragOver") {
      this.dragOver = true;
    } else if (output.type === "dragOut") {
      this.dragOver = false;
    } else if (output.type === "drop") {
      this.dragOver = false;
    } else if (
      output.type === "rejected" &&
      typeof output.file !== "undefined"
    ) {
      console.log(output.file.name + " rejected");
    }

    this.files = this.files.filter(
      (file) => file.progress.status !== UploadStatus.Done
    );
    this.fetchFilesOfProject();
  }

  startUpload(): void {
    const event: UploadInput = {
      type: "uploadAll",
      url: this.url,
      method: "POST",
      data: { foo: "bar" },
    };

    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: "cancel", id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: "remove", id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: "removeAll" });
  }
  /* file upload end */
}
