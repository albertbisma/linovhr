import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/primeng';

declare var $:any;
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
  idManagement:any;
  management: any[];
  
  constructor(private formBuilder:FormBuilder, private http:Http, private router: Router, private lastURI : ActivatedRoute) { 
    this.lastURI.params.subscribe(param => this.idManagement = param.id);    
  }

  ngOnInit() {
    this.createMForm();  
    if(this.idManagement !== undefined){
      $('#updatemanagement').show();
      $('#createnewmanagement').hide();
      this.loadData(this.idManagement);
    }else{
      $('#updatemanagement').hide();
      $('#createnewmanagement').show();
    }
  }

  createMForm(){
    this.managementForm = this.formBuilder.group({
      idManagement:[''],
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
    if(this.idManagement !== undefined){
    this.http.put(this.url, data).subscribe(response =>{
      this.showSuccessUpdate();
      setTimeout(()=>{
        this.router.navigate(['/management']);
      },500);
      console.log('---------Management in JSON Format!!---------');
      console.log(data);
      console.log(response);
    },error=>{
      console.log(error);
      this.showError(error._body);
    })
    }else{     
      this.http.post(this.url,data)
      .subscribe( response => {
        this.showSuccess();
        setTimeout(()=>{
          this.router.navigate(['/management']);
        }, 500);         
      },error =>{
        console.log(error);
        this.showError(error._body);
      }) 
    }
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

  showSuccessUpdate(){
    this.msgs=[];
    this.msgs.push(
      {
        severity:'success',
        summary:'SUCCESS',
        detail:'Data Management berhasil diperbarui!'
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
    this.http.get(this.url+'/'+id)
        .subscribe(response =>{
          this.management = response.json();
          this.managementForm.patchValue(this.management);
        })
  }
}


