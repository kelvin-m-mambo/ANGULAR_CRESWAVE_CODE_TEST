import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  // statusList = ["Incomplete","complete"];
  taskForm !: FormGroup;
  actionBtn : string = "save"
  constructor(private formBuilder : FormBuilder, 
    private api :ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent> ) { }

    ngOnInit(): void {
      this.taskForm = this.formBuilder.group({
        title : ['', Validators.required],
        description : ['', Validators.required],
        status : ['', Validators.required]
      })
      if(this.editData){
        this.actionBtn = "Update";
        this.taskForm.controls['title'].setValue(this.editData.title);
        this.taskForm.controls['description'].setValue(this.editData.description);
        this.taskForm.controls['status'].setValue(this.editData.status);
      }
    }
  

  addTask(){
   if (!this.editData){
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
   }else this.updateTask()
  }
  updateTask(){
    this.api.putTask(this.taskForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Task updated succesfuly");
        this.taskForm.reset();
        this.dialogRef.close('update');
      },
      
    })
  }
  
}

