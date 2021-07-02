import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProjectsService {
  private _url: string = "";

  constructor(private http: HttpClient) {
    this._url = environment.baseUrl;
  }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this._url + "/projects");
  }

  getProject(id: any): Observable<any> {
    return this.http.get<any>(this._url + "/projects/" + id);
  }

  createProject(data: any): Observable<any> {
    return this.http.post(this._url + "/projects", data);
  }

  updateProject(id, data: any): Observable<any> {
    return this.http.put<any>(this._url + "/projects/" + id, data);
  }

  deleteProject(id): Observable<any> {
    return this.http.delete<any>(this._url + "/projects/" + id);
  }

  // resetForm(): void {
  //   this.projectForm.reset();
  // }
}
