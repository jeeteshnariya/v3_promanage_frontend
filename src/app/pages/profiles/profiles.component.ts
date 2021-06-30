import { Component, OnInit } from "@angular/core";
import { UsersService } from "app/_services/users.service";

@Component({
  selector: "app-profiles",
  templateUrl: "./profiles.component.html",
  styleUrls: ["./profiles.component.css"],
})
export class ProfilesComponent implements OnInit {
  private users: any = {};
  public message: string = "";
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(
      (resp: any) => {
        console.log("Successfully logged in");
        // console.log(resp.users);
        this.users = resp.users;
      },
      (err) => {
        console.error("Error logging in", err);
        this.message = err.error.errors;
      }
    );
  }
}
