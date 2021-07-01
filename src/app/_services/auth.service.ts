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

  isLoggedIn() {
    // return this.token != null;
    return localStorage.getItem("token") != null;
  }
  logout() {
    return localStorage.removeItem("token");
  }
}
