import { Task } from './../../models/task';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  @Output() addTask : EventEmitter<Task> = new EventEmitter();
  @Output() deleteTask : EventEmitter<Task> = new EventEmitter();
  @Output() onToggle : EventEmitter<Task> = new EventEmitter();
  @Output() onEdit : EventEmitter<Task[]> = new EventEmitter();

  @Input() completedtasks: Task[] = [];
  @Input() todotasks: Task[]= [];
  @Input() isSelected: boolean = false;

  selected: Task[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onSelected(str: Task){
    if(this.selected.indexOf(str) == -1)
      this.selected.push(str);
    else
      this.selected.splice(this.selected.indexOf(str), 1);
    console.log(this.selected);
  }

  addTaskDialog(){
    let task: Task = {
      "completed": false,
      "name" : "",
      "description" : ""
    };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '300px',
      data: {
        "task": task,
        "title": "Add"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.name != "" && result != null && result.name != null){
        task = result;
        this.addTask.emit(
          task
        );
      }
    });
  }

  editTask(task: Task){
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '300px',
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

        task = result;
      }
    });   
  }

  onDeleteTasks(){
    this.selected.forEach(task => {
      this.deleteTask.emit(task);
    });
  }

  onDeleteTask(task: Task){
    if(this.selected.indexOf(task) != -1){
      this.selected.splice(this.selected.indexOf(task), 1);
    }
    this.deleteTask.emit(task);
  }

  onCompleted(){
    this.selected.forEach(task => {
      this.onToggle.emit(task);
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
      if(this.selected.indexOf(task) != -1){
        this.selected.splice(this.selected.indexOf(task), 1);
      }
      this.onToggle.emit(task);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}