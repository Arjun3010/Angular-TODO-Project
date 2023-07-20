import { Category } from './../models/category';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  getTODO() : Category[]{
    let data = localStorage.getItem("TODO");
    if(data == null)
      return [];
    let jsonData = JSON.parse(data);
    

    let categories: Category[] = [];

    jsonData.categories.forEach((element : string) => {
      categories.push(
        this.parseCategory(element)
      );
    });

    return categories;
  }

  setTODO(category: Category[]) : void{
    let categories: string[] = [];
    category.forEach(element => {
      categories.push(this.jsonifyCategory(element));
    });

    localStorage.setItem(
      "TODO",
      JSON.stringify({
        "categories": categories
      })
    );
  }

  jsonifyCategory(category : Category) : string{
    let a : string[] = [];
    
    category.tasks.forEach(element => {
      a.push(
        this.jsonifyTask(element)
      );
    });

    return JSON.stringify({
      category: category.category,
      tasks: a
    });
  }

  jsonifyTask(task: Task) : string{
    return JSON.stringify({
      name: task.name,
      description: task.description,
      completed: task.completed
    });
  }

  parseCategory(cat : string) : Category{
    let jsonData = JSON.parse(cat);

    let tasks: Task[] = [];

    jsonData.tasks.forEach((element : string) => {
      tasks.push(
        this.parseTask(element)
      );
    });

    let category: Category = {
      "category": jsonData.category,
      "tasks": tasks
    }

    return category;
  }

  parseTask(tsk: string) : Task{
    let data = JSON.parse(tsk);
    
    let task: Task = {
      "completed": data.completed,
      "name": data.name,
      "description": data.description,
    };

    return task;
  }
}
