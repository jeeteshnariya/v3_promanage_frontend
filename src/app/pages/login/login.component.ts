import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "app/_services/auth.service";

@Component({
  selector: "login-cmp",
  templateUrl: "login.component.html",
  moduleId: module.id,
})
export class LoginComponent implements OnInit {
  private usersForm: FormGroup;
  public message: string = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  login() {
    console.log(this.usersForm);

    this.authService.login(this.usersForm.value).subscribe(
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

  initForm(): void {
    this.usersForm = this.fb.group({
      email: "Rubye_Jones99@hotmail.com",
      password: "",
      device_name: "web",
    });
  }
}
