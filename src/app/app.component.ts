import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demo';
  displayedColumns: string[] = ['title', 'description', 'status',  'action'];
  dataSource: MatTableDataSource<any>; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) {
    this.dataSource = new MatTableDataSource<any>(); 
  }

  ngOnInit(): void {
    this.getAllTasks();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
        this.getAllTasks();
      }
    })
  }

  getAllTasks() {
    this.api.getTask()
      .subscribe({
        next: (res) => {
          this.dataSource.data = res;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          console.error("Error while fetching the record!!!!!", err);
          alert("Error while fetching the record!!!!!")
        }
      });  
  }
  editTask(row : any){
    this.dialog.open(DialogComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update'){
        this.getAllTasks();
      }
    })
  }

  deleteTask(id:number){
    this.api.deleteTask(id)
    .subscribe({
      next:(res)=>{
        alert("Task delted succesfuly");
        this.getAllTasks();
      },
      error:()=>{
        alert("Error while deleting the task")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
