import { CategoryDialogComponent } from './../category-dialog/category-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() addCategory: EventEmitter<string> = new EventEmitter();
  @Output() onSelect: EventEmitter<string> = new EventEmitter();
  @Output() onEdit: EventEmitter<string> = new EventEmitter();
  @Output() onDelete : EventEmitter<string> = new EventEmitter();
  @Input() values: string[] = [];

  selected : string = "";

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onAdd(){
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '250px',
      data: {
        "title": "Add",
        "category": ""
      }
    });

    dialogRef.afterClosed().subscribe(result => {     
      if(result !== "" && result != null)
        this.addCategory.emit(result);
    });
  }

  deleteCategory(){
    this.onDelete.emit("Deleted Succesfully....");
  }

  onSelected(str: string){
    if(str === this.selected){
      str = "";
    }
    
    this.selected = str;
    this.onSelect.emit(this.selected);
    
  }

  editCategory(){
    if(this.selected != ""){
      const dialogRef = this.dialog.open(CategoryDialogComponent, {
        autoFocus: true,
        data: {
          "title": "Edit",
          "category": this.selected
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {      
        if(result !== "" && result != null){
          this.selected = result;
          this.onEdit.emit(result);
        }
      });
    }
  }
}