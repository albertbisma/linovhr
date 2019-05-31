import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Spinner, Message } from 'primeng/primeng';
import { Router } from '@angular/router';


@Component({
  selector: 'app-testing',  
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {    
  msgs: Message[] = [];
  constructor(private router:Router,private confirmationService:ConfirmationService) { }

  ngOnInit() {
  }

  confirm(){
    this.confirmationService.confirm({
      message: 'Are you sure?',
      header: 'Confirmation',
      icon: 'fa fa-pencil',
      accept: ()=>{
        this.msgs =[{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
      },
      reject:()=>{
        this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }    
    });
  }

}
