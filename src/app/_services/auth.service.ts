import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // private _token: string = null;
  private _url: string = "";
  constructor(private http: HttpClient) {
    this._url = environment.baseUrl;
  }

  login(user): Observable<any> {
    return this.http.post(this._url + "/login", user).pipe(
      map((resp: any) => {
        // this._token = resp.token;
        localStorage.setItem("token", resp.token);
        localStorage.setItem("user", JSON.stringify(resp.user));
        return resp;
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(this._url + "/logout", {}).pipe(
      map((resp: any) => {
        // this._token = resp.token;
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        return resp;
      })
    );
  }

  set token(token: string) {
    // this._token = token;
    localStorage.setItem("token", token);
  }

  get token() {
    return localStorage.getItem("token");
  }

  get user() {
    var user = JSON.parse(localStorage.getItem("user"));
    return user;
  }

  isLoggedIn() {
    // return this.token != null;
    return localStorage.getItem("token") != null;
  }
}
