import { Component, OnInit } from "@angular/core";

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

  ngOnInit() {}

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
