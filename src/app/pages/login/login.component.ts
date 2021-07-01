import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "app/_services/auth.service";

@Component({
  selector: "login-cmp",
  templateUrl: "login.component.html",
  moduleId: module.id,
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  private user: any = {};
  public message: string = "";
  ngOnInit(): void {}

  loginx() {
    console.log("login");
    this.router.navigate(["/dashboard"]);
  }

  login() {
    this.user.device_name = "web";
    this.authService.login(this.user).subscribe(
      (resp) => {
        console.log("Successfully logged in");

        console.log(resp.token);
        this.router.navigate(["/dashboard"]);
      },
      (err) => {
        console.error("Error logging in", err);
        this.message = err.error.errors;
      }
    );
  }
}
