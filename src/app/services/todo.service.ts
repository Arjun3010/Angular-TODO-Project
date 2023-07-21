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

    jsonData.categories.forEach((category : string) => {
      categories.push(
        this.parseCategory(category)
      );
    });

    return categories;
  }

  setTODO(category: Category[]) : void{
    let categories: string[] = [];
    category.forEach(category => {
      categories.push(this.jsonifyCategory(category));
    });

    localStorage.setItem(
      "TODO",
      JSON.stringify({
        "categories": categories
      })
    );
  }

  jsonifyCategory(category : Category) : string{
    let tasks : string[] = [];
    
    category.tasks.forEach(task => {
      tasks.push(
        this.jsonifyTask(task)
      );
    });

    return JSON.stringify({
      id: category.id,
      category: category.category,
      tasks: tasks
    });
  }

  jsonifyTask(task: Task) : string{
    return JSON.stringify({
      id: task.id,
      name: task.name,
      description: task.description,
      status: task.status
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
      "id": jsonData.id,
      "category": jsonData.category,
      "tasks": tasks
    }

    return category;
  }

  parseTask(tsk: string) : Task{
    let data = JSON.parse(tsk) as Task;
    
    let task: Task = {
      "id": data.id,
      "status": data.status,
      "name": data.name,
      "description": data.description,
    };

    return task;
  }
}
