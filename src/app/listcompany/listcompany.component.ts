import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import {  FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-listcompany",
  templateUrl: "./listcompany.component.html",
  styleUrls: ["./listcompany.component.css"]
})
export class ListcompanyComponent implements OnInit {
  maps: any[];
  clients = [];
  listClient = [];
  mapLogo = new Map();
  tasks: any;
  today = new Date();
  minDate: Date;
  maxDate: Date;
  scheduleDate: Date;
  startDate: Date;
  finishDate: Date;
  years = [];
  bulan: string;
  tahun: number;
  idPs: string;
  detail: any;

  loading: boolean;
  loaded = false;
  isClientReady: boolean;

  month = new Map()
    .set(0,'JANUARI')
    .set(1,'FEBRUARI')
    .set(2,'MARET')
    .set(3,'APRIL')
    .set(4,'MEI')
    .set(5,'JUNI')
    .set(6,'JULI')
    .set(7,'AGUSTUS')
    .set(8,'SEPTEMBER')
    .set(9,'OKTOBER')
    .set(10,'NOVEMBER')
    .set(11,'DESEMBER');

  formPeriod: FormGroup;

  hdr: any[];
  formHdr: FormGroup;
  formDtl: FormGroup;

  getHdrUrl = 'http://localhost:8080/taskschedule/'
  getClientUrl = 'http://localhost:8080/client/'
  mapClientUrl = "http://localhost:8080/mapclient/";
  mapLogoUrl = "http://localhost:8080/logo";
  tasksUrl = "http://localhost:8080/task";

  constructor(private http: Http, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.idPs = '580ba13f-d056-4b11-84fe-e879447ae5a7';
    this.getPeriod();
    this.getYears();
    this.getTasks();
    this.createFormPeriod();
    this.createFormHdr();
    this.getHdr();
    this.createFormDtl();
  }

  getPeriod() {
    this.scheduleDate = new Date();
    this.minDate = new Date(this.scheduleDate.getFullYear(), this.scheduleDate.getMonth(), 1);
    this.maxDate = new Date(this.scheduleDate.getFullYear(), this.scheduleDate.getMonth() + 1, 0);
    this.bulan =  this.month.get(this.scheduleDate.getMonth());
    this.tahun = this.scheduleDate.getFullYear();
  }

  createFormPeriod() {
    this.formPeriod = this.formBuilder.group({
      bulan: ["", Validators.required],
      tahun: ["", Validators.required]
    });
  }

  getHdr() {
    this.http.get(this.getHdrUrl + this.idPs + '/' + this.bulan + '/' + this.tahun)
    .subscribe(response => {
      this.hdr = response.json();
      console.log(this.hdr);
      this.formHdr.patchValue(this.hdr);

      this.hdr.forEach(header => {
        this.clients.push(header.client);
        console.log(this.clients);
        this.listClient.push({client: header.client, tasks: header});
      });
      this.getMapClient();
    })
  }

  getDtl(idHdr) {
    this.loading = true;
    this.http.get(this.getHdrUrl + 'dtl/id-hdr/' + idHdr)
    .subscribe(response => {
      this.detail = response.json();
      console.log(this.detail);
      this.loading = false;
      this.loaded = true;
    });
  }

  createFormHdr(){
    this.formHdr = this.formBuilder.group({
      kodeTask:['', Validators.required],
      payrollSpecialist: this.formBuilder.group({
        idPs:['', Validators.required]
      }),
      bulan:['',Validators.required],
      tahun:['',Validators.required],
      client: this.formBuilder.group({
        idClient:['',Validators.required]
      })
    })
  }

  createFormDtl(){
    this.formDtl = this.formBuilder.group({
      task: this.formBuilder.group({
        idTask:['', Validators.required]
      }),
      tglAwal:['', Validators.required],
      tglAkhir:['', Validators.required],
      keterangan:['', Validators.required]
    })
  }

  getTasks() {
    this.http.get(this.tasksUrl).subscribe(response => {
      console.log(response.json());

      this.tasks = response.json();
    });
  }

  getMapClient() {
    this.http.get(this.mapClientUrl + 'client/%20' + '/payroll/NULL/true').subscribe(response => {
      console.log(response.json());

      this.maps = response.json();

      this.maps.forEach(map => {
        this.clients.push(map.client);
        this.listClient.push({client: map.client});
        console.log(this.clients);
      });

      this.getLogo();
    });
  }

  getLogo() {
    this.clients.forEach(client => {
      this.http.get(this.mapLogoUrl + '/client/' + client.idClient).subscribe(res => {
        let logoClient: any;
        logoClient = res.json();

        this.mapLogo.set(client.idClient, logoClient.logo);
      });
    });
    this.isClientReady = true;
    console.log(this.listClient);
  }

  getYears() {
    var date = new Date();
    var currentYear = date.getFullYear();

    //set values for year dropdown
    for (var i = 0; i <= 5; i++) {
      this.years.push(currentYear - i);
    }
  }

}
