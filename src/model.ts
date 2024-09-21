import View from './view';

export default class Model {
  public view?: View;
  public todos: never[];

  constructor() {
    this.todos = [];
  }

  setView(view: View) {
    this.view = view;
  }

  getTodos() {
    return this.todos;
  }

  addTodo(title: string, description: string) {
    console.log(title, description);
  }
}
