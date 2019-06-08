import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Message, ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-taskindex',
  templateUrl: './taskindex.component.html',
  styleUrls: ['./taskindex.component.css']
})
export class TaskindexComponent implements OnInit {
  tasks: any[];
  msgs:Message[]=[];
  url = 'http://localhost:8080/task';
  constructor(private http: Http, private confirmationService:ConfirmationService) {
    this.getData();
   }

  ngOnInit() {
  }

  getData(){
    this.http.get(this.url)
    .subscribe(response =>{
      console.log(response.json());
      this.tasks = response.json();
    })
  }

  onDelete(id){
    try{
      this.http.delete(this.url+"/"+id).subscribe(response => {
        this.getData();
        this.popUpMsg();
      }),
      error =>{
        console.log(error);
      }
    }catch(e){
      console.log(e);
    }
  }


  confirmDelete(id,kode,nama){
    this.confirmationService.confirm({
      message: 'Are you sure want to delete this <strong>'+kode+' ('+nama+') </strong>?',
      header: 'CAUTION!!!'     ,
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
