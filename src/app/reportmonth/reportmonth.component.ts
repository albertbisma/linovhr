import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Http, ResponseContentType } from "@angular/http";
import * as FileSaver from 'file-saver';

@Component({
  selector: "app-reportmonth",
  templateUrl: "./reportmonth.component.html",
  styleUrls: ["./reportmonth.component.css"]
})
export class ReportmonthComponent implements OnInit {
  rptPSForm: FormGroup;
  reports: any;
  ps: {
    taskTotal: number;
    taskDone: number;
    taskPending: number;
  }[] = [];
  bulanValue: string;
  month: string;
  year: string;
  years = [];

  downloadText = 'Download Report';

  url = "http://localhost:8080/report/payroll/";
  jasperUrl = "http://localhost:8080/jasper/ps/";

  constructor(private formBuilder: FormBuilder, private http: Http) {}

  ngOnInit() {
    this.createRptPSForm();
    this.getYears();
  }

  createRptPSForm() {
    this.rptPSForm = this.formBuilder.group({
      bulan: ["", Validators.required],
      tahun: ["", Validators.required]
    });
  }

  onFormSubmit() {
    let data = this.rptPSForm.value;
    this.http
      .get(
        this.url +
          this.rptPSForm.get("bulan").value +
          "/" +
          this.rptPSForm.get("tahun").value
      )
      .subscribe(response => {
        console.log(response.json());
        this.reports = response.json();
        this.reports.forEach(report => {
          let pss = { taskTotal: 0, taskDone: 0, taskPending: 0 };
          report.clients.forEach(client => {
            client.tasks.forEach(task => {
              if (task.status === "DONE") {
                pss.taskDone++;
              } else {
                pss.taskPending++;
              }
              pss.taskTotal++;
            });
          });
          this.ps.push(pss);
        });
        let sel = <HTMLSelectElement>document.getElementById('month');
        this.month = sel.options[sel.selectedIndex].text;
        this.bulanValue = (<HTMLSelectElement>document.getElementById("month")).value;
        this.year = (<HTMLSelectElement>document.getElementById("year")).value;
      },
      error => {
        console.log(error);
      }
      )
  }

  downloadPDF() {
    let element = <HTMLInputElement> document.getElementById("btn-download");
    element.disabled = true;
    this.downloadText = 'Downloading';
      this.http.get(this.jasperUrl + this.bulanValue + "/" + this.year, {responseType: ResponseContentType.Blob}).subscribe(r => {
        element.disabled = false;
      this.downloadText = 'Download Report';
        let data: any = r.blob();
        console.log(data);
        var blob = new Blob([data], {type: 'application/pdf'});
        console.log(blob);
        FileSaver.saveAs(blob, "employeeReport.pdf");
      });
  }

  getYears() {
    var date = new Date();
    var currentYear = date.getFullYear();

    //set values for year dropdown
    for (var i = 0; i <= 5; i++) {
      this.years.push(currentYear - i);
    }
  }

  scrollToElement(id) {
    let el = document.getElementById(id);
    el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
