import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/primeng';

  declare var $:any;

@Component({
  selector: 'app-taskform',
  templateUrl: './taskform.component.html',
  styleUrls: ['./taskform.component.css']
})
export class TaskformComponent implements OnInit {
  taskForm: FormGroup;
  task:any;
  idTask:any;
  msgs: Message[]=[];
  url = 'http://localhost:8080/task';
  constructor(private http:Http, private formBuilder:FormBuilder, private router:Router, private lastURI:ActivatedRoute) { 
    this.lastURI.params.subscribe(param => this.idTask = param.id);
  }

  ngOnInit() {      
    this.createTaskForm();
    if(this.idTask !== undefined){      
      $('#updatetask').show();
      $('#createnewtask').hide();
      this.loadData(this.idTask);
      console.log("ID ADA!");     
    }else{
      $('#updatetask').show();
      $('#createnewtask').hide();
      console.log("ID KOSONG");      
    }        
  }

  createTaskForm(){
    this.taskForm = this.formBuilder.group({
      idTask:['',Validators.required],
      kodeTask:['', Validators.required],
      jenisTask:['',Validators.required]
    })
  }

  onFormSubmit(){
    let data = this.taskForm.value;
    if(this.idTask !== undefined){
      console.log(this.idTask);
      this.http.put(this.url, data).subscribe(response => {
        this.showSuccessUpdate();        
        setTimeout(()=> {
          this.router.navigate(['/tasktype']);
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
    this.http.post(this.url,data).subscribe(response=>{
      this.showSuccess();

      setTimeout(()=> {
        this.router.navigate(['/tasktype']);
      }, 500);           
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
        detail:'Congratulations! Tasktype added successfully'
      }
    )
  }
  
  showSuccessUpdate(){
    this.msgs=[];
    this.msgs.push(
      {
        severity:'success',
        summary:'SUCCESS',
        detail:'Data Task Type berhasil diperbarui!'
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
      this.task = response.json();
      // console.log(this.user);
      this.taskForm.patchValue(this.task);
    })
  }
}
