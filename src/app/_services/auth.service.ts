import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _token: string = null;
  private _url: string = "";
  constructor(private http: HttpClient) {
    this._url = environment.baseUrl;
  }

  login(user): Observable<any> {
    return this.http.post(this._url + "/login", user).pipe(
      map((resp: any) => {
        this._token = resp.token;
        return resp;
      })
    );
  }

  set token(token: string) {
    this._token = token;
  }

  get token() {
    return this._token;
  }

  isLoggedIn() {
    return this.token != null;
  }
}
