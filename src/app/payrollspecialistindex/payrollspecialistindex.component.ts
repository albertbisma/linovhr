import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Message, ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-payrollspecialistindex',
  templateUrl: './payrollspecialistindex.component.html',
  styleUrls: ['./payrollspecialistindex.component.css']
})
export class PayrollspecialistindexComponent implements OnInit {
  payrolls;    
  url = 'http://localhost:8080/payrollspecialist';
  msgs:Message[]=[];
  constructor(private http:Http, private confirmationService:ConfirmationService) {    
   }

  ngOnInit() {   
    this.getData();
  }

  getData(){
    this.http.get(this.url).
    subscribe( response => {            
    this.payrolls = response.json();      
    });            
  }

  onDelete(id){
    try{
      this.http.delete(this.url+"/"+id).subscribe(response => {
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
      message: 'Are you sure want to delete this <strong>'+nama+' </strong>?',
      header: 'CAUTION!!!'     ,
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
