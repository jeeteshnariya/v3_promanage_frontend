import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "app/_services/users.service";

@Component({
  selector: "user-cmp",
  moduleId: module.id,
  templateUrl: "user.component.html",
})
export class UserComponent implements OnInit {
  public seletedfile = null;
  public imagePath;
  imgURL: any;
  public messageImg: string;
  public userId: string = "";

  private usersForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userSvc: UsersService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.initForm();
    this.route.queryParams.subscribe((params) => {
      this.userId = params["id"];
    });
    console.log(this.userId);
    if (this.userId) {
      this.fetchUserById();
    }
  }

  fetchUserById() {
    this.userSvc.getUser(this.userId).subscribe((res: any) => {
      this.usersForm.patchValue(res.users[0]);
    });
  }

  initForm(): void {
    this.usersForm = this.fb.group({
      email: "",
      name: "",
      profiles: this.fb.group({
        address: "",
        avtar: "",
        college_name: "",
        course: "",
        cover: "",
        gender: "",
        name: "",
        phone: "",
        qualification: "",
        semester: "",
        status: "",
      }),
    });
  }

  fileSelected(event) {
    this.messageImg = null;
    var files = event.target.files;
    console.log(files);
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.messageImg = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }
}
