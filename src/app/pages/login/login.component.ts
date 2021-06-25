import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "login-cmp",
  templateUrl: "login.component.html",
  moduleId: module.id,
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  login() {
    console.log("login");
    this.router.navigate(["/dashboard"]);
  }
}
