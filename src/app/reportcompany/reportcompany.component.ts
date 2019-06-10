import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Http, ResponseContentType } from "@angular/http";
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-reportcompany',
  templateUrl: './reportcompany.component.html',
  styleUrls: ['./reportcompany.component.css']
})

export class ReportcompanyComponent implements OnInit {
  rptClientForm: FormGroup;
  reports: any;
  month: string;
  bulanValue: string;
  year: string;
  years = [];

  downloadText = 'Download Report';

  url = "http://localhost:8080/report/client/";
  jasperUrl = "http://localhost:8080/jasper/client/";

  constructor(private formBuilder: FormBuilder, private http: Http) {}

  ngOnInit() {
    this.createRptClientForm();
    this.getYears();
  }

  createRptClientForm() {
    this.rptClientForm = this.formBuilder.group({
      bulan: ["", Validators.required],
      tahun: ["", Validators.required]
    });
  }

  onFormSubmit() {
    let data = this.rptClientForm.value;
    this.http
      .get(
        this.url +
          this.rptClientForm.get("bulan").value +
          "/" +
          this.rptClientForm.get("tahun").value
      )
      .subscribe(response => {
        console.log(response.json());
        this.reports = response.json();
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
      FileSaver.saveAs(blob, "clientReport.pdf");
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
