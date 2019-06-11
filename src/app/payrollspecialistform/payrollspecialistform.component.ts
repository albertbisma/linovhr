import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Message } from 'primeng/primeng';
import { Router, ActivatedRoute } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-payrollspecialistform',
  templateUrl: './payrollspecialistform.component.html',
  styleUrls: ['./payrollspecialistform.component.css']
})
export class PayrollspecialistformComponent implements OnInit {  
  payrolls: any[];
  payroll: any;
  idPs:any;
  payrollForm:FormGroup;
  msgs: Message[]=[];
  formSubmitted=false;
  url = 'http://localhost:8080/payrollspecialist';

  constructor(private router:Router,private http:Http, private formBuilder:FormBuilder, private lastURI: ActivatedRoute) { 
    this.lastURI.params.subscribe(param => this.idPs = param.id);   
    this.http.get('http://localhost:8080/user').
    subscribe( response =>{
      console.log(response.json());
      this.payrolls = response.json();
    })
  }

   ngOnInit() {
    this.createPayrollForm();       
    this.existNotExist();   
    if(this.idPs !== undefined){
      $('#updatepayroll').show();
      $('#createnewpayroll').hide();
      $('#userexist').prop('disabled', true);
      $('#emailuser').prop('disabled', true);
      $('#kodepayroll').prop('disabled', true);
      this.loadData(this.idPs);
    }else{      
      $('#updatepayroll').hide();
      $('#createnewpayroll').show();      
    }       
  }
  

  existNotExist(){
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
      idPs:['',Validators.required],
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
    if(this.idPs !== undefined){
      this.http.put(this.url, data).subscribe(response =>{
        console.log(response);        
        this.showSuccessUpdate();
        setTimeout(()=>{
          this.router.navigate(['/payroll']);
        },500);
      },
      error =>{      
        console.log(data);
          this.showError(error._body);         
      })
    }else{
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
        detail:'Congratulations! Payroll specialist added successfully'
      }
    )
  }

  showSuccessUpdate(){
    this.msgs=[];
    this.msgs.push(
      {
        severity:'success',
        summary:'SUCCESS',
        detail:'Data Payroll Specialist berhasil diperbarui!'
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
        .subscribe(response => {
          this.payroll = response.json();

          this.payrollForm.patchValue(this.payroll);
        })
  }

}
