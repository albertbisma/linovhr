import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  client: any;
  idClient: any;
  imageSrc: any;
  gambar:any;
  resplogo:any;
  selectedFile:File = null;
  url = 'http://localhost:8080/client';
  msgs: Message[]=[];
  
  constructor(private router:Router, private http:Http, private formBuilder: FormBuilder, private route:Router, private lastURI:ActivatedRoute){
    this.lastURI.params.subscribe(param => this.idClient = param.id );
   }


  ngOnInit() {
    this.createClientForm();
    if(this.idClient !== undefined){
      $('#updateclient').show();
      $('#createnewclient').hide();
      this.loadData(this.idClient);
    }else{
      $('#updateclient').hide();
      $('#createnewclient').show();
    }

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
    this.selectedFile = <File> event.target.files[0];    
    
    if(event.target.files && event.target.files[0]){
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }

  private prepareUpload(): any{
    let input = new FormData();
    
    input.append('json', JSON.stringify(this.clientForm.value))
    input.append('logo', this.selectedFile, this.selectedFile.name);

    console.log(input);
    return input;
  } 
  
  
  loadData(id){
    this.http.get(this.url+'/'+id)
        .subscribe(response => {
          this.client = response.json();
          this.clientForm.patchValue(this.client);
          this.getLogo(this.idClient);
        })
  }

  getLogo(id){
    this.http.get('http://localhost:8080/logo/client/'+id)
        .subscribe(response => {
          console.log(response);          
          this.resplogo = response.json();
          this.gambar = this.resplogo.logo;
          console.log("gambar");
          console.log(this.gambar);
          
        })

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
