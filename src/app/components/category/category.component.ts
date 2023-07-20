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
          'category' : category,
          'tasks' : []
        }
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
    this.todotasks = [];
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
    this.updateTasks(index);
  }

  editTask(task: Task[]){
    let index = this.categories.findIndex(x => x.category == this.selectedCategory);
    let ind = this.categories[index].tasks.indexOf(task[0]);
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

  onToggle(value: Task){
    let index = this.categories.findIndex(x => x.category === this.selectedCategory);
    let ind = this.categories[index].tasks.findIndex(x => x === value);

    this.categories[index].tasks.splice(ind, 1);
    value.completed = !value.completed;

    if(value.completed){
      this.categories[index].tasks.push(value);
    }
    else{
      ind = this.categories[index].tasks.findIndex(x => x.completed == true) != -1 ? this.categories[index].tasks.findIndex(x => x.completed == true) : ind;
      if(ind == -1){
        ind = 1;
      }
      this.categories[index].tasks.splice(ind, 0, value);
    }

    this.todoService.setTODO(this.categories);

    this.updateTasks(index);

  }

  updateTasks(index: number){
    this.todotasks = [];
    this.completedtasks = [];
    
    this.categories[index].tasks.forEach(element => {
      if(element.completed)
        this.completedtasks.push(element);
      else
        this.todotasks.push(element)
    });
  }

}
