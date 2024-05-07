import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
  providers: [MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule, FormsModule]
})
export class EditTaskComponent implements OnInit {
  taskId: number = -1;
  taskTitle: string = '';
  taskDescription: string = '';
  tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.taskId = +this.route.snapshot.paramMap.get('id')!;

    const task = this.tasks.find(task => task.id === this.taskId);

    if (task) {
      this.taskTitle = task.title;
      this.taskDescription = task.description;
    }
  }

  editTask(): void {
    const taskIndex = this.tasks.findIndex(task => task.id === this.taskId);

    if (taskIndex !== -1) {
      this.tasks[taskIndex].title = this.taskTitle;
      this.tasks[taskIndex].description = this.taskDescription;

      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.router.navigate(['/']);
    }
  }
}
