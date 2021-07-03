import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FilesService {
  private _url: string = "";

  constructor(private http: HttpClient) {
    this._url = environment.baseUrl;
  }

  geFiles(): Observable<any[]> {
    return this.http.get<any[]>(this._url + "/files");
  }

  geFilesByProjectId(id: any): Observable<any> {
    return this.http.get<any>(this._url + "/files/" + id);
  }

  createFile(data: any): Observable<any> {
    return this.http.post(this._url + "/files", data);
  }

  updateFile(id, data: any): Observable<any> {
    return this.http.put<any>(this._url + "/files/" + id, data);
  }

  deleteFile(id): Observable<any> {
    return this.http.delete<any>(this._url + "/files/" + id);
  }
}
