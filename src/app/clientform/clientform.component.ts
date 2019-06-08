import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/components/common/messageservice';
import { Message } from 'primeng/primeng';

declare var $:any;

@Component({
  selector: 'app-clientform',
  templateUrl: './clientform.component.html',
  styleUrls: ['./clientform.component.css']
})
export class ClientformComponent implements OnInit {  
  clientForm:FormGroup;
  selectedFile:File = null;
  url = 'http://localhost:8080/client';
  msgs: Message[]=[];
  constructor(private router:Router, private http:Http, private formBuilder: FormBuilder, private route:Router) { }


  ngOnInit() {
    this.createClientForm();

    $(".custom-file-input").on("change", function() {
      var fileName = $(this).val().split("\\").pop();
      $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });
  }

  createClientForm(){
    this.clientForm = this.formBuilder.group({
    
        kodeClient: ['',Validators.required],
        nama:['', Validators.required],
        aktif:['',Validators.required]
    })
  }
 
  onFormSubmit(){
    const formModel = this.prepareUpload();

    let json = formModel;
    console.log(json);

    this.http.post(this.url,json).subscribe(response=>{
      console.log(response);
      this.showSuccess();  

      console.log(JSON.stringify(this.clientForm.value));          
      setTimeout(()=> {
        this.router.navigate(['/client']);
      }, 500);        
    },
    error =>{
      this.showFail();
    }
    )        
    } 

    showSuccess(){
      this.msgs = [];
      this.msgs.push(
        {
          severity:'success', summary:'Success', detail:'Congratulation! New data has been added'
        }
      )
    }

    showFail(){
      this.msgs = [];
      this.msgs.push(
        {
          severity:'error', summary:'Error ', detail:'An unknown error occured!'
        }
      )
    }

  onFileSelected(event){
    // console.log(event);
    this.selectedFile = <File> event.target.files[0];
    console.log(event);
    
  }

  private prepareUpload(): any{
    let input = new FormData();
    
    input.append('json', JSON.stringify(this.clientForm.value))
    input.append('logo', this.selectedFile, this.selectedFile.name);

    console.log(input);
    return input;
  }      

    // onUpload(){
    // const formModel = this.prepareUpload();
    // const ind = new FormData();
    // ind.append('logo', this.selectedFile);
    // this.http.post(this.url, ind,)
    // .subscribe(response =>{      
    //   console.log(response);      
    // });
  // }
}
