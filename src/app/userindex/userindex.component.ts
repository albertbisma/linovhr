import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ConfirmationService, Message } from 'primeng/primeng';


@Component({
  selector: 'app-userindex',
  templateUrl: './userindex.component.html',
  styleUrls: ['./userindex.component.css']
})
export class UserindexComponent implements OnInit {
  users: any[];
  msgs:Message[]=[];
  url = 'http://localhost:8080/user';

  constructor(private http: Http, private confirmationService:ConfirmationService) {    
    this.getData();
  }

  ngOnInit() {
  }

  getData(){
    this.http.get(this.url)
    .subscribe(response =>{
      console.log(response.json());
      
       this.users = response.json();      
    });
  }
  
  onDelete(id){    
    try{      
      this.http.delete(this.url+'/'+id)
      .subscribe(response =>{
            this.getData();  
            this.popUpMsg();       
          })
    }catch(e){
      console.log(e);
    }       
  }

  confirmDelete(id,nama){
    this.confirmationService.confirm({
      message: 'Are you sure want to delete this <strong>'+nama+' </strong>?',
      header: 'CAUTION!!!',
      icon: 'fas fa-exclamation-triangle',
      accept:()=>{
        this.onDelete(id);
      }
    })
  }

  popUpMsg(){
    this.msgs = [];
    this.msgs.push(
      {
        severity:'success', summary:'SUCCESS', detail:'Congratulations your data sucessfully removed!'
      }
    )
  }
}


