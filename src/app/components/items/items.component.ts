import { Task } from './../../models/task';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  @Output() addTask : EventEmitter<Task> = new EventEmitter();
  @Output() deleteTask : EventEmitter<Task> = new EventEmitter();
  @Output() onEdit : EventEmitter<Task[]> = new EventEmitter();

  @Input() completedtasks: Task[] = [];
  @Input() todotasks: Task[]= [];
  @Input() pendingtasks: Task[]= [];
  @Input() isSelected: boolean = false;

  currentCategoryTasks: Task[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onSelected(str: Task){
    if(this.currentCategoryTasks.indexOf(str) == -1)
      this.currentCategoryTasks.push(str);
    else
      this.currentCategoryTasks.splice(this.currentCategoryTasks.indexOf(str), 1);
  }

  addTaskDialog(){   
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {
        "title": "Add"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null && result.name != "" && result.name != null){
        this.addTask.emit(
          result
        );
      }
    });
  }

  editTask(task: Task){
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {
        "task": task,
        "title": "Edit"
      }
    });

    dialogRef.afterClosed().subscribe((result : Task) => {
      if(result.name != "" && result != null && result.name != null){
        this.onEdit.emit(
          [task, result]
        );
      }
    });   
  }

  onDeleteTasks(){
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        "title": "Delete Task ",
        "status": "delete the selected tasks?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {     
      if(result != null){
        this.currentCategoryTasks.forEach(task => {
          this.deleteTask.emit(task);
        });
      }
    });
  }

  onDeleteTask(task: Task){
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        "title": "Delete Task ",
        "status": "delete this task?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {     
      if(result != null){
        if(this.currentCategoryTasks.indexOf(task) != -1){
          this.currentCategoryTasks.splice(this.currentCategoryTasks.indexOf(task), 1);
        }
        this.deleteTask.emit(task);
      }
    });
  }

  onUpdateStatus(status: string){
    this.currentCategoryTasks.forEach(task => {
      let data = {
        ...task,
        status: status
      };

      this.onEdit.emit([task, data]);
      this.currentCategoryTasks = [];
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      
      let task = event.previousContainer.data[event.previousIndex];
      if(this.currentCategoryTasks.indexOf(task) != -1){
        this.currentCategoryTasks.splice(this.currentCategoryTasks.indexOf(task), 1);
      }
      let status = "todo";

      if(event.container.id == "cdk-drop-list-1")
        status = "pending";
      else if(event.container.id == "cdk-drop-list-2")
        status = "completed";
    
      let data = {
        ...task,
        status: status
      }

      this.onEdit.emit([task, data]);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}