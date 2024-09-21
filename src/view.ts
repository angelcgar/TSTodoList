import Model from './model';

export default class View {
  public model?: Model;
  public table: HTMLTableElement;
  public btn: HTMLButtonElement;
  constructor() {
    this.table = document.getElementById('table') as HTMLTableElement;
    this.btn = document.getElementById('add') as HTMLButtonElement;

    this.btn.onclick = () => this.addTodo('Title', 'Desc');
  }

  setModel(model: Model) {
    this.model = model;
  }

  addTodo(title: string, description: string) {
    console.log(title, description);
  }
}
