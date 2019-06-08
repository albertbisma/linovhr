import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-managementform',
  templateUrl: './managementform.component.html',
  styleUrls: ['./managementform.component.css']
})
export class ManagementformComponent implements OnInit {
  url = 'http://localhost:8080/management';
  users;
  msgs:Message[]=[];
  managementForm: FormGroup;
  
  constructor(private formBuilder:FormBuilder, private http:Http, private router: Router) { 
    this.http.get('http://localhost:8080/user').
    subscribe( response =>{
      console.log(response.json());
      this.users = response.json();
    })
  }

  ngOnInit() {
    this.createMForm();
  }

  createMForm(){
    this.managementForm = this.formBuilder.group({
      kodeManagement:['', Validators.required],
      nama:['', Validators.required],
      alamat:['', Validators.required],
      email: ['', Validators.required],
      telp: ['', Validators.required],
      aktif: ['', Validators.required]
    })
  }

  get nama(){
    return this.managementForm.get('nama');
  }
  
  onFormSubmit(){
    let data = this.managementForm.value;

    this.http.post(this.url,data)
        .subscribe( response => {
          this.showSuccess();
          setTimeout(()=>{
            this.router.navigate(['/management']);
          }, 500);         
        },
        error =>{
          console.log(error);
        }
        )
  }

  showSuccess(){
    this.msgs=[];
    this.msgs.push(
      {
        severity:'success',
        summary:'SUCCESS',
        detail:'Congratulations! Management added successfully'
      }
    )
  }
}


