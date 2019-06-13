import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Message, ConfirmationService } from 'primeng/primeng';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  url = 'http://localhost:8080/taskschedule';
  tasks:any;  
  msgs:Message[]=[];
  logos = new Map();
  idClient;
  selectedTask: any;  
  displayDialog: boolean;
  detail = [];
  constructor(private http:Http, private confirmationService: ConfirmationService) {

  }

  ngOnInit() {
    this.getDataTask();    
  }
  
  getDataTask(){
    this.http.get(this.url).subscribe(response => {
      this.tasks = response.json();
      console.log(this.tasks);
      
      this.tasks.forEach(element => {
        this.getLogoById(element.client.idClient);
      });     
    })
  }

  getLogoById(idClient){
    this.http.get('http://localhost:8080/logo/client/'+idClient)
        .subscribe(response => {
          let logo = response.json();
          this.logos.set(idClient, logo.logo)          
        })
  }

  onClick(namaPs,namaClient){
    this.http.get('http://localhost:8080/saldo/'+namaPs+'/'+namaClient+'/PENDING').subscribe(response => {         
      let saldo = response.json();
      let detailTemp = [];
      saldo.forEach(element => {
        detailTemp.push(element.dtlCreateTask);        
      });
      this.detail = detailTemp;      
      console.log(this.detail);
    })
  }

  delete(idDtl, namaPs, namaClient){
    try{
      this.http.delete('http://localhost:8080/taskschedule/'+idDtl)
          .subscribe(response => {
            this.onClick(namaPs,namaClient);
            this.showSuccess();
    })
    }catch(e){
      console.log(e);
    }    
  }

  confirmDelete(id, nama, namaPs, namaClient){
    this.confirmationService.confirm({
      message: 'Are you sure want to delete this <strong>'+nama+' </strong>?',
      header: 'CAUTION!!!',
      icon: 'fas fa-exclamation-triangle',
      accept:()=>{
        this.delete(id,namaPs,namaClient);
      }
    })
  }

  showSuccess(){
    this.msgs = [];
    this.msgs.push({
      severity:'success', summary:'SUCCESS', detail:'Congratulations your data successfully removed!'
    })
  }

  selectTask(task:any){
    this.selectedTask = task;
    this.displayDialog =true;
  }

  onDialogHide(){
    this.selectedTask = null;
  }

  active(data:any){
    this.tasks.array.forEach((item,index) => {
      item.active = false;      
      console.log("FALSE!");
      
    });
    data.active = true;
    console.log('TRUE!');
    
  }

}
