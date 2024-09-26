import View from './view';

import { Todo } from './interface';
import { SetTodo } from './interface/Todo';

export default class Model {
  public view: View | null;
  public todos: Todo[];
  public currentId: number;

  constructor() {
    this.view = null;
    this.todos = JSON.parse(localStorage.getItem('todos')!);
    if (!this.todos || this.todos.length < 1) {
      this.todos = [
        {
          id: 0,
          title: 'LeardJs',
          description: 'Wath Js tutorials',
          completed: false,
        },
      ];
      this.currentId = 1;
    } else {
      this.currentId = this.todos[this.todos.length - 1].id + 1;
    }
  }

  setView(view: View) {
    this.view = view;
  }

  save() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  getTodos(): Todo[] {
    return this.todos.map((todo) => ({ ...todo }));
  }

  findTodo(id: number) {
    return this.todos.findIndex((todo) => todo.id === id);
  }

  toggleCompleted(id: number) {
    const index = this.findTodo(id);
    const todo = this.todos[index];
    todo.completed = !todo.completed;
    this.save();
  }

  editTodo(id: string, values: SetTodo) {
    const index = this.findTodo(Number(id));
    Object.assign(this.todos[index], values);
    this.save();
  }

  addTodo(title: string, description: string) {
    const todo: Todo = {
      id: this.currentId++,
      title,
      description,
      completed: false,
    };

    this.todos.push(todo);
    console.log(this.todos);
    this.save();

    return { ...todo };
  }

  removeTodo(id: number) {
    const index = this.findTodo(id);

    this.todos.splice(index, 1);
    this.save();
  }
}
