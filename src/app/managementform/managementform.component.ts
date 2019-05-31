import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managementform',
  templateUrl: './managementform.component.html',
  styleUrls: ['./managementform.component.css']
})
export class ManagementformComponent implements OnInit {
  url = 'http://localhost:8080/management';
  users;
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
  
  onFormSubmit(){
    let data = this.managementForm.value;

    this.http.post(this.url,data)
        .subscribe( response => {
          this.router.navigate(['/managementindex']);
        })
  }
}
