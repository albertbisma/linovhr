import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Management } from '../managementindex/management'

@Component({
  selector: 'app-managementindex',
  templateUrl: './managementindex.component.html',
  styleUrls: ['./managementindex.component.css']
})
export class ManagementindexComponent implements OnInit {
  managements: any[];
  msgs: Message[] = [];
  cols:any[];
  stacked: boolean;
  url ='http://localhost:8080/management';
  datamanagement:Management[];

  constructor(private http: Http, private confirmationService:ConfirmationService) {        
   }

  ngOnInit() {
    this.getData();      
  }

  toggle() {
    this.stacked = !this.stacked;
  }

  getData(){
    this.http.get(this.url)
    .subscribe(response =>{
      this.managements = response.json();
    });
  }

  onDelete(id){
    try{
      this.http.delete(this.url+"/"+id).subscribe(response => {
        this.getData();
      }),
      error =>{
        console.log(error);
      }
    }catch(e){
      console.log(e);
    }
  }

  confirmDelete(id,nama){
    this.confirmationService.confirm({
      message: 'Do you really want to delete this <strong>'+nama+'</strong> ?',
      header: 'CAUTION!!!',
      icon: 'fas fa-exclamation-triangle',
      accept:()=>{
        this.onDelete(id);
        this.popUpMsg();
      }
    })
  }

  popUpMsg(){
    this.msgs = [];
    this.msgs.push(
      {
        severity:'success',summary:'SUCCESS', detail:'Congratulations your data sucessfully removed!'
      }
    )
  }
}
