import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class TosterService {
  constructor(private toastr: ToastrService) {}
  public config: any = {
    timeOut: 2000,
    closeButton: true,
    enableHtml: true,
    toastClass: "alert alert-success alert-with-icon",
    positionClass: "toast-" + "top" + "-" + "right",
  };

  success(msg) {
    this.toastr.success(
      `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">${msg}</span>`,
      "",
      this.config
    );
  }

  warning(msg) {
    this.config.toastClass = "alert alert-warning alert-with-icon";

    this.toastr.warning(
      `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">${msg}</span>`,
      "",
      this.config
    );
  }

  error(msg) {
    this.config.toastClass = "alert alert-danger alert-with-icon";
    this.toastr.error(
      `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">${msg}</span>`,
      "",
      this.config
    );
  }

  show(msg) {
    this.config.toastClass = "alert alert-primary alert-with-icon";

    this.toastr.show(
      `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">${msg}</span>`,
      "",
      this.config
    );
  }

  info(msg) {
    this.config.toastClass = "alert alert-info alert-with-icon";

    this.toastr.info(
      `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">${msg}</span>`,
      "",
      this.config
    );
  }
}
