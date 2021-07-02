import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProjectsService {
  private _url: string = "";
  constructor(private http: HttpClient, private toastr: ToastrService) {
    this._url = environment.baseUrl;
  }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this._url + "/projects");
  }

  getProject(code: string): Observable<any> {
    return this.http.get<any>(this._url + "/projects/" + code);
  }

  createProject(stock: any): Observable<any> {
    return this.http.post(this._url + "/projects", stock);
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

  displayMsg(msg) {
    this.toastr.success(
      `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">${msg}</span>`,
      "",
      {
        timeOut: 2000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-" + "top" + "-" + "right",
      }
    );
  }
}
