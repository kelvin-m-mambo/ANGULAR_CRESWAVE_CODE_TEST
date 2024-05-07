import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: [MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule, FormsModule]
})
export class AddTaskComponent {
  taskTitle: string = '';
  taskDescription: string = '';
  
  addTask(title: string, description: string) {
    const task: Task = {
      id: Math.floor(Math.random() * 100),
      title: title,
      description: description
    };

    let tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    this.taskTitle = '';
    this.taskDescription = '';
  }
}
