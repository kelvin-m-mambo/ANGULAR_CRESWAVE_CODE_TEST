// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Task } from './task';

// @Injectable({
//   providedIn: 'root'
// })
// export class TaskService {
//   private apiUrl = 'http://localhost:3000/tasks';

//   constructor(private http: HttpClient) { }

//   getTasks(): Observable<Task[]> {
//     return this.http.get<Task[]>(this.apiUrl);
//   }

//   createTask(task: Task): Observable<Task> {
//     return this.http.post<Task>(this.apiUrl, task);
//   }

//   updateTask(task: Task): Observable<Task> {
//     const url = `${this.apiUrl}/${task.id}`;
//     return this.http.put<Task>(url, task);
//   }

//   deleteTask(id: number): Observable<Task> {
//     const url = `${this.apiUrl}/${id}`;
//     return this.http.delete<Task>(url);
//   }
// }