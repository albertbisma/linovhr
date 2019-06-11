import { Component, OnInit } from '@angular/core';
import{ FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/primeng';

declare var $:any;

@Component({
  selector: 'app-inputuser',
  templateUrl: './inputuser.component.html',
  styleUrls: ['./inputuser.component.css']
})
export class InputuserComponent implements OnInit {
  userForm:FormGroup    ;
  formSubmitted=false;  
  url = 'http://localhost:8080/user';
  msgs:Message[]=[];
  email1: string;  
  idUser: any;
  user: any[];
  users;

  constructor(private formBuilder:FormBuilder, private http:Http, private router:Router, private lastURI: ActivatedRoute) { 
    this.lastURI.params.subscribe(param => this.idUser = param.id);  
   }
  ngOnInit() {    
    this.createUserForm();    
    if(this.idUser !== undefined){      
      $('#updateuser').show();
      $('#createnewuser').hide();
      this.loadData(this.idUser);
      console.log("ID ADA!");     
    }else{
      $('#updateuser').hide();
      $('#createnewuser').show();
      console.log("ID KOSONG");      
    }        
  }
  
  onFormSubmit(){
    let data = this.userForm.value;
    
    if(this.idUser !== undefined){
      console.log(this.idUser);
      this.http.put(this.url, data).subscribe(response => {
        this.showSuccessUpdate();
        console.log("UPDATE NI!!!!");
        setTimeout(()=> {
          this.router.navigate(['/user']);
        }, 500);           
        console.log('-----------------User in JSON Format-----------------');    
        console.log(data);
        console.log(response);
        },
        error =>{
          console.log(error);
          this.showError(error._body);          
        })      
    }else{
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
      this.showError(error._body);      
    })
  }
    // let user: User = this.userForm.value;              
  } 
  
  get email(){
    return this.userForm.get('email');
  }
    
  createUserForm(){
    this.userForm = this.formBuilder.group({
      idUser:['', Validators.required],
      email:['', Validators.required],
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

  showSuccessUpdate(){
    this.msgs=[];
    this.msgs.push(
      {
        severity:'success',
        summary:'SUCCESS',
        detail:'Data User berhasil diperbarui!'
      }
    )
  } 

  showError(msg){
    this.msgs=[];
    this.msgs.push(
      {
        severity:'error',
        summary:'ERROR!!',
        detail:msg
      }
    )
  } 

  loadData(id){
    // console.log(id);
    this.http.get(this.url+'/'+id)
    .subscribe(response => {
      this.user = response.json();
      // console.log(this.user);
      this.userForm.patchValue(this.user);
    })
  }
}


