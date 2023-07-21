import { CategoryDialogComponent } from './../category-dialog/category-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

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

  selectedCategory : string = "";

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onAdd(){
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
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
    if(this.selectedCategory != ''){
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        data: {
          "title": "Delete Category ",
          "status": "delete " + this.selectedCategory + " category?"
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {     
        if(result != null){
          this.selectedCategory = '';
          this.onDelete.emit("");
        }
      });
    }
    
  }

  onSelected(str: string){
    if(str === this.selectedCategory){
      str = "";
    }
    
    this.selectedCategory = str;
    this.onSelect.emit(this.selectedCategory);
    
  }

  editCategory(){
    if(this.selectedCategory != ""){
      const dialogRef = this.dialog.open(CategoryDialogComponent, {
        autoFocus: true,
        data: {
          "title": "Edit",
          "category": this.selectedCategory
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {      
        if(result !== "" && result != null){
          this.selectedCategory = result;
          this.onEdit.emit(result);
        }
      });
    }
  }
}