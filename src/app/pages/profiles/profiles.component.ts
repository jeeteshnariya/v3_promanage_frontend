import { Component, OnInit } from "@angular/core";
import { TosterService } from "app/_services/toster.service";
import { UsersService } from "app/_services/users.service";

@Component({
  selector: "app-profiles",
  templateUrl: "./profiles.component.html",
  styleUrls: ["./profiles.component.css"],
})
export class ProfilesComponent implements OnInit {
  private users: any = null;
  public message: string = "";
  constructor(private userService: UsersService, private tost: TosterService) {}

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

  removeUsers(id) {
    this.userService.deleteUsers(id).subscribe(
      (res: any) => {
        console.log(res);
        this.fetchUsers();
        this.tost.error(res.message);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  _d(ev, typ) {
    if (ev.profiles) {
      return ev.profiles[typ];
    } else {
      return "NaN";
    }
  }
}
