import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TosterService } from "app/_services/toster.service";
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
    private fb: FormBuilder,
    private tost: TosterService
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

  onSubmit() {
    if (this.userId) {
      this.updateUserProfile();
    } else {
      this.createUserProfile();
    }
  }

  createUserProfile() {
    this.userSvc.createUsers(this.usersForm.value).subscribe(
      (res: any) => {
        console.log(res);
        this.tost.success(res.message);
        this.router.navigate(["/profiles"]);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  updateUserProfile() {
    this.userSvc.updateUsers(this.userId, this.usersForm.value).subscribe(
      (res: any) => {
        console.log(res);
        this.tost.info(res.message);
        this.router.navigate(["/profiles"]);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  initForm(): void {
    this.usersForm = this.fb.group({
      email: "",
      name: "",
      profiles: this.fb.group({
        address: "",
        avtar: "",
        college_name: "Vidhiya Sagar",
        cover: "",
        gender: "Male",
        phone: "",
        qualification: "MscIT",
        semester: 1,
        status: "Active",
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
