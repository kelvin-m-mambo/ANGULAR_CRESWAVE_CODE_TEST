import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  // statusList = ["Incomplete","complete", "Not Done"];
  taskForm !: FormGroup;

  constructor(private formBuilder : FormBuilder, private api : ApiService, private dialogRef : MatDialogRef<DialogComponent> ) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      tittle : ['', Validators.required],
      description : ['', Validators.required],
      status : ['', Validators.required]
    })
  }
  addTask(){
    if(this.taskForm.valid){
      this.api.postTask(this.taskForm.value)
      .subscribe({
        next:(res)=>{
          alert(" Task added succesfuly")
          this.taskForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert( " error while fetching the task")
        }
      })
    }
  }

  
}
