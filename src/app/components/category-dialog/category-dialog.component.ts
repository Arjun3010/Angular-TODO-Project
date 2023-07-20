import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject} from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})

export class CategoryDialogComponent{
  category: string = "";
  title: string = "";

  constructor(
    public dialogRef: MatDialogRef<SidebarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.category = data.category;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}