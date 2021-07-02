import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FilesService } from "app/_services/files.service";
import { ProjectsService } from "app/_services/projects.service";
import { TasksService } from "app/_services/tasks.service";
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
  public tasks: any = null;
  active = 1;
  private taskId: number = null;

  private taskForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectsService,
    private fb: FormBuilder,
    private tost: TosterService,
    private taskService: TasksService,
    private fileService: FilesService
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
      this.fetchTaskOfProject();
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
}
