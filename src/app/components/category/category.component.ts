import { TodoService } from './../../services/todo.service';
import { Task } from './../../models/task';
import { Category } from './../../models/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  strings: string[] = [];
  selectedCategory: string = "";

  completedtasks: Task[] = [];
  todotasks: Task[]= [];
  pendingtasks: Task[] = [];
  
  constructor(private todoService : TodoService) {}

  ngOnInit(): void {
    this.categories = this.todoService.getTODO();
    this.categories.forEach(element => {
      this.strings.push(element.category);
    });
  }

  addCategory(category: string){
    if(this.strings.indexOf(category) == -1){
      this.strings.push(category);

      this.categories.push(
        {
          "id": String(Number(localStorage.getItem("categoryID")) + 1),
          'category' : category,
          'tasks' : []
        }
      );

      localStorage.setItem(
        "categoryID", 
        String(Number(localStorage.getItem("categoryID")) + 1)
      );

      this.todoService.setTODO(this.categories);
    }
  }

  editCategory(category: string){
    let ind = this.strings.indexOf(this.selectedCategory);
    this.categories[ind].category = category;
    this.strings[ind] = category;
    this.selectedCategory = category;
    this.todoService.setTODO(this.categories);
  }

  deleteCategory(str: string){
    let ind = this.strings.indexOf(this.selectedCategory);
    this.categories.splice(ind,1);
    this.strings.splice(ind,1);
    this.completedtasks = [];
    this.pendingtasks = [];
    this.todotasks = [];
    this.selectedCategory = '';
    if(this.categories.length == 0){
      localStorage.setItem("categoryID", "0");
      localStorage.setItem("taskID", "0");
    }
    this.todoService.setTODO(this.categories);
  }

  onSelect(value: string){
    this.selectedCategory = value;
    this.updateTasks(this.categories.findIndex(x => x.category == this.selectedCategory));
  }

  onAddTask(task: Task){
    let index = this.categories.findIndex(x => x.category == this.selectedCategory);
    this.categories[index].tasks.push(task);
    this.todoService.setTODO(this.categories);
    localStorage.setItem(
      "taskID", 
      String(Number(localStorage.getItem("taskID")) + 1)
    );
    this.updateTasks(index);
  }

  editTask(task: Task[]){
    let index = this.categories.findIndex(x => x.category == this.selectedCategory);
    let ind = this.categories[index].tasks.findIndex(x => x.id === task[0].id);
    this.categories[index].tasks[ind] = task[1];
    this.todoService.setTODO(this.categories);
    this.updateTasks(index);
  }

  deleteTask(task: Task){
    let index = this.categories.findIndex(x => x.category == this.selectedCategory);
    let ind = this.categories[index].tasks.indexOf(task);
    this.categories[index].tasks.splice(ind, 1);
    this.todoService.setTODO(this.categories);
    this.updateTasks(index);
  }

  updateTasks(index: number){
    console.log('Index: ' + index)
    console.log('Categories: ' + this.categories[index].category )
    this.todotasks = [];
    this.pendingtasks = [];
    this.completedtasks = [];
    
    this.categories[index].tasks.forEach(task => {
      if(task.status == "completed")
        this.completedtasks.push(task);
      else if(task.status == "pending")
        this.pendingtasks.push(task);
      else
        this.todotasks.push(task);
    });

    console.log(this.todotasks, this.completedtasks, this.pendingtasks)
  }

}
