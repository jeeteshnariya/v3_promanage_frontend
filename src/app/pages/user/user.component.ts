import { Component, OnInit } from "@angular/core";
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userSvc: UsersService
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.userId = params["id"];
    });
    console.log(this.userId);
    this.fetchUserById();
  }

  fetchUserById() {
    this.userSvc.getUser(this.userId).subscribe((res: any) => console.log);
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
