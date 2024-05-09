import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { DialogComponent } from './dialog/dialog.component';

const routes: Routes = [
  { path: 'add-task', component: AddTaskComponent }, 
  {path: 'add-dialog', component: DialogComponent}
  
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
