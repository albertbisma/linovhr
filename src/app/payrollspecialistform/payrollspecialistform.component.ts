import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Message } from 'primeng/primeng';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-payrollspecialistform',
  templateUrl: './payrollspecialistform.component.html',
  styleUrls: ['./payrollspecialistform.component.css']
})
export class PayrollspecialistformComponent implements OnInit {  
  payrolls: any[];
  payrollForm:FormGroup;
  msgs: Message[]=[];
  formSubmitted=false;
  url = 'http://localhost:8080/payrollspecialist';

  constructor(private router:Router,private http:Http, private formBuilder:FormBuilder) { 
    this.http.get('http://localhost:8080/user').
    subscribe( response =>{
      console.log(response.json());
      this.payrolls = response.json();
    })
   } 

   ngOnInit() {
    this.createPayrollForm();        

    $('#userexist').change(function(){
      if($(this).is(':checked')){
        $('.emailisexist').show(500);
        $('.emailnotexist').hide(500);
      }else{
        $('.emailisexist').hide(500);
        $('.emailnotexist').show(500);
      }      
    });
  }

  
  createPayrollForm(){
    this.payrollForm = this.formBuilder.group({
      kodePs:['', Validators.required],
      user: this.formBuilder.group({
        idUser:['', Validators.required],
        email:['',Validators.required],
        userType:['PAYROLL_SPECIALIST', Validators.required]
      }),
      nama:['', Validators.required],
      alamat:['', Validators.required],
      telp:['', Validators.required],
      aktif:['', Validators.required]
    })
  }

  onFormSubmit(){
    let data = this.payrollForm.value;
    this.http.post(this.url, data).subscribe(
      response => {
        this.showSuccess();
        setTimeout(()=>{
          this.router.navigate(['/payroll']);
        },500);
        console.log(data);
        console.log(response);
      },
      error =>{
        console.log(error);
      })
  }


  showSuccess(){
    this.msgs=[];
    this.msgs.push(
      {
        severity:'success',
        summary:'SUCCESS',
        detail:'Congratulations! Payroll specialist added successfully'
      }
    )
  }
  

}
