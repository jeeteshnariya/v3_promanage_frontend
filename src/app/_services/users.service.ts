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

  getUsers(data = null): Observable<any[]> {
    return this.http.get<any[]>(this._url + "/users", { params: data });
  }

  getUser(id: string): Observable<any> {
    return this.http.get<any>(this._url + "/users/" + id);
  }

  createUsers(data: any): Observable<any> {
    return this.http.post(this._url + "/users", data);
  }

  updateUsers(id, data: any): Observable<any> {
    return this.http.put<any>(this._url + "/users/" + id, data);
  }

  deleteUsers(id): Observable<any> {
    return this.http.delete<any>(this._url + "/users/" + id);
  }
}
