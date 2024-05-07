import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router'; // Import Router instead of RouterLink
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'], // Use styleUrls instead of styleUrl
  providers: [MatButtonModule, MatCardModule] // Provide necessary modules
})
export class TaskListComponent {
  tasks: Task[] = [];

  constructor(private router: Router) {
    this.loadTasks();
  }

  loadTasks(): void {
    const tasksFromStorage = localStorage.getItem('tasks');
    if (tasksFromStorage) {
      this.tasks = JSON.parse(tasksFromStorage);
    }
  }

  saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  removeTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();
  }

  markAsDone(task: Task): void {
    task.done = true;
    this.saveTasks();
  }
}
