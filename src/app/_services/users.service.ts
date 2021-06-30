import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private _url: string = "";

  constructor(private http: HttpClient) {
    this._url = environment.baseUrl;
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this._url + "/users");
  }

  getUser(code: string): Observable<any> {
    return this.http.get<any>(this._url + "/users/" + code);
  }

  createUser(stock: any): Observable<any> {
    return this.http.post(this._url + "/users", stock);
  }
}
