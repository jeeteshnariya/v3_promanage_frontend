import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log("AuthGuard#canActivate called");

    if (this.authService.isLoggedIn()) {
      return true;
    }

    console.log("AuthGuard#canActivate not authorized to access page");
    // Can store current route and redirect back to it
    // Store it in a service, add it to a query param
    this.router.navigate(["/login"]);

    return false;
  }
}
