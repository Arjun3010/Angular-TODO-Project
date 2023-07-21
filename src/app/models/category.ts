import { Task } from './task';

export interface Category{
    id: string,
    category: string;
    tasks: Task[];
}