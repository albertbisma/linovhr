import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Message,ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-clientindex',
  templateUrl: './clientindex.component.html',  
  styleUrls: ['./clientindex.component.css']
})
export class ClientindexComponent implements OnInit {  
  logos: any[]; 
  msgs: Message[]=[];
  
  private url = 'http://localhost:8080/logo';

  constructor(private http: Http, private confirmationService:ConfirmationService) {        
    this.getData();        
    }

  ngOnInit() {
  }


getData(){
    this.http.get(this.url)
    .subscribe(response =>{
      console.log(response.json());      
      this.logos = response.json();            
    });
  }

  onDelete(id){
    try{
      this.http.delete('http://localhost:8080/client'+"/"+id)
          .subscribe(response =>{
            this.getData();
            this.popUpMsg();
          }),
          error => {
            console.log(error);
          }
    }catch(e){
      console.log(e);
    }
  }

  confirmDelete(id,nama){
    this.confirmationService.confirm({
      message:'Are you sure want to delete this <strong>'+nama+' </strong>?',
      header: 'CAUTION!!!',      
      icon: 'fas fa-exclamation-triangle',
      accept:()=>{
        this.onDelete(id);
      }
    })
  }

  popUpMsg(){
    this.msgs =[];
    this.msgs.push(
      {
        severity:'success',
        summary:'SUCCESS',
        detail:'Congratulations your data sucessfully removed!'
      }
    )
  }

}
