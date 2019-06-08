import { Component, OnInit } from '@angular/core';
import{ FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';


@Component({
  selector: 'app-inputuser',
  templateUrl: './inputuser.component.html',
  styleUrls: ['./inputuser.component.css']
})
export class InputuserComponent implements OnInit {
  userForm:FormGroup;
  formSubmitted=false;  
  url = 'http://localhost:8080/user';
  msgs:Message[]=[];
  email1: string;

  constructor(private formBuilder:FormBuilder, private http:Http, private router:Router) {
    this.http.get('http://localhost:8080/user').subscribe(response =>{
      console.log(response.json());
    })
   }

  ngOnInit() {
    this.createUserForm();
  }

  get email(){
    return this.userForm.get('email');
  }

  createUserForm(){
    this.userForm = this.formBuilder.group({
      email:['', Validators.required, Validators.email],
      userType:['', Validators.required]
    })
  }

  showSuccess(){
    this.msgs=[];
    this.msgs.push(
      {
        severity:'success',
        summary:'SUCCESS',
        detail:'Congratulations! User added successfully'
      }
    )
  }
  

  onFormSubmit(){
    let data = this.userForm.value;
    this.http.post(this.url, data).subscribe(response =>{    
      
      this.showSuccess();

      setTimeout(()=> {
        this.router.navigate(['/user']);
      }, 500);           
      console.log('-----------------User in JSON Format-----------------');    
      console.log(data);
      console.log(response);
    },
    error =>{
      console.log(error);
    }
    )
    // let user: User = this.userForm.value;              
  }
}
