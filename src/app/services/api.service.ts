import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postTask(data : any){
    return this.http.post<any>("http://localhost:3000/tasks", data);
  }
  getTask(){
    return this.http.get<any>("http://localhost:3000/tasks ");
  }

  putTask(data:any,id : number){
    return this.http.put<any>("http://localhost:3000/tasks/"+id,data);
  }
  deleteTask(id:number){
    return this.http.delete<any>("http://localhost:3000/tasks/"+id);
  }
}
