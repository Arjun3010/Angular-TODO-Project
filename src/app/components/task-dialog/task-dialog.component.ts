import { Task } from './../../models/task';
import { ItemsComponent } from './../items/items.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject} from '@angular/core';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent{
  title: string = ""
  task: Task = {
    "id": String(Number(localStorage.getItem("taskID")) + 1),
    "status": "todo",
    "description": "",
    "name": ""
  }

  constructor(
    public dialogRef: MatDialogRef<ItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    if(data.task != null){
      this.task = data.task;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
