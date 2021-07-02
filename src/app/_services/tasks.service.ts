import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  private _url: string = "";

  constructor(private http: HttpClient) {
    this._url = environment.baseUrl;
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this._url + "/tasks");
  }

  getTasksByProjectId(id: any): Observable<any> {
    return this.http.get<any>(this._url + "/tasks/" + id);
  }

  createTask(data: any): Observable<any> {
    return this.http.post(this._url + "/tasks", data);
  }

  updateTask(id, data: any): Observable<any> {
    return this.http.put<any>(this._url + "/tasks/" + id, data);
  }

  deleteTask(id): Observable<any> {
    return this.http.delete<any>(this._url + "/tasks/" + id);
  }
}
