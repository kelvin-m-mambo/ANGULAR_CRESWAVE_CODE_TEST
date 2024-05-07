import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: Task[] = [];

  constructor() {
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
    // console.log(task);
    this.saveTasks();
}
}