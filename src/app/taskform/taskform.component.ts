import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

  declare var $:any;

@Component({
  selector: 'app-taskform',
  templateUrl: './taskform.component.html',
  styleUrls: ['./taskform.component.css']
})
export class TaskformComponent implements OnInit {
  taskForm: FormGroup;
  url = 'http://localhost:8080/task';
  constructor(private http:Http, private formBuilder:FormBuilder, private router:Router) { }

  ngOnInit() {      
    this.createTaskForm();
  }

  createTaskForm(){
    this.taskForm = this.formBuilder.group({
      kodeTask:['', Validators.required],
      jenisTask:['',Validators.required]
    })
  }

  onFormSubmit(){
    let data = this.taskForm.value;
    this.http.post(this.url,data).subscribe(response=>{
      this.router.navigate(['/task']);      
    },
    error =>{
      console.log(error);
    })
  }
}
