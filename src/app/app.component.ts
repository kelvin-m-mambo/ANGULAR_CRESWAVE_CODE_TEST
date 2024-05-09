import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from './services/api.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'status',  'action'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  openDialog() {
    const isXSmallScreen = this.breakpointObserver.isMatched(Breakpoints.XSmall);
    const isSmallScreen = this.breakpointObserver.isMatched(Breakpoints.Small);

    let dialogWidth = '30%';
    if (isXSmallScreen) {
      dialogWidth = '100%';
    } else if (isSmallScreen) {
      dialogWidth = '70%';
    }

    this.dialog.open(DialogComponent, {
      width: dialogWidth
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
          alert("Error while fetching the record!!!!!")
        }
      });  
  }

  editTask(row : any){
    const isXSmallScreen = this.breakpointObserver.isMatched(Breakpoints.XSmall);
    const isSmallScreen = this.breakpointObserver.isMatched(Breakpoints.Small);

    let dialogWidth = '30%';
    if (isXSmallScreen) {
      dialogWidth = '100%';
    } else if (isSmallScreen) {
      dialogWidth = '70%';
    }

    this.dialog.open(DialogComponent,{
      width: dialogWidth,
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
        alert("Task deleted successfully");
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
