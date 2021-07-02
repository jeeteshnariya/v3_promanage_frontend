import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class FilesService {
  public afuConfig: any = {
    multiple: true,
    formatsAllowed: ".jpg,.png,.doc,.pdf,.docx,.xls,.zip,.rar",
    maxSize: "10",
    uploadAPI: {
      url: environment.baseUrl + "/uploads",
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      responseType: "blob",
    },
    theme: "dragNDrop",
    hideProgressBar: false,
    hideResetBtn: false,
    hideSelectBtn: true,
    fileNameIndex: false,
    replaceTexts: {
      selectFileBtn: "Select Files",
      resetBtn: "Reset",
      uploadBtn: "Upload",
      dragNDropBox: "Drag N Drop",
      attachPinBtn: "Attach Files...",
      afterUploadMsg_success: "Successfully Uploaded !",
      afterUploadMsg_error: "Upload Failed !",
      sizeLimit: "Size Limit ",
    },
  };
  constructor() {}
}
