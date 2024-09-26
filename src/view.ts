import AddTodo from './components/add-todo';
import Modal from './components/modal';
import Filters from './components/filters';

import type Model from './model';

import { Todo } from './interface';
import { SetTodo } from './interface/Todo';

type Filter = { type: string; words: string };
// type Callback = (type: string, filters: string) => void;

export default class View {
  public model: Model | null;
  public table: HTMLTableElement;
  public addTodoForm: AddTodo;
  public modal: Modal;
  public filters: Filters;

  constructor() {
    this.model = null;
    this.table = document.getElementById('table') as HTMLTableElement;
    this.addTodoForm = new AddTodo();
    this.modal = new Modal();
    this.filters = new Filters();

    this.addTodoForm.onClick((title, description) =>
      this.addTodo(title, description),
    );
    this.modal.onClick((id, values) => this.editTodo(id!.toString(), values!));
    this.filters.onClick((filters: Filter) => this.filter(filters));
  }

  setModel(model: Model) {
    this.model = model;
  }

  render() {
    const todos = this.model!.getTodos();
    todos?.forEach((todo) => this.createRow(todo));
  }

  filter(filters: Filter) {
    const { type, words } = filters;
    const [, ...rows] = this.table.getElementsByTagName(
      'tr',
    ) as HTMLCollectionOf<HTMLTableRowElement>;
    for (const row of rows) {
      const [title, description, completed] = row.children;
      let shoulHide = false;
      if (words) {
        shoulHide =
          !title.innerText.includes(words) &&
          !description.innerText.includes(words);
      }

      const shouldBeCompleted = type === 'completed';
      const isCompleted = completed.children[0].checked;

      if (type !== 'all' && shouldBeCompleted !== isCompleted) {
        shoulHide = true;
      }

      if (shoulHide) {
        row.classList.add('d-none');
      } else {
        row.classList.remove('d-none');
      }
    }
  }

  addTodo(title: string, description: string): void {
    const todo = this.model!.addTodo(title, description);
    this.createRow(todo);
  }

  toggleCompleted(id: number) {
    this.model?.toggleCompleted(id);
  }

  editTodo(id: string, values: SetTodo) {
    this.model!.editTodo(id, values);
    const row = document.getElementById(id) as HTMLTableCellElement;
    row.children[0].innerText = values.title;
    row.children[1].innerText = values.description;
    row.children[2].children[0].checked = values.completed;
  }

  remuveTodo(id: number) {
    this.model!.removeTodo(id);
    document.getElementById(id.toString())?.remove();
  }

  createRow(todo: Todo) {
    const row = this.table.insertRow();
    row.setAttribute('id', todo.id.toString());
    row.innerHTML = `
      <td>${todo.title}</td>
      <td>${todo.description}</td>
      <td class="text-center">

      </td>
      <td class="text-right">

      </td>
    `;

    const checkbox = document.createElement('input') as HTMLInputElement;
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.onclick = () => this.toggleCompleted(todo.id);
    row.children[2].appendChild(checkbox);

    const editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'btn-primary', 'mb-1');
    editBtn.innerHTML = `<i class="fa fa-pencil"></i>`;
    editBtn.setAttribute('data-toggle', 'modal');
    editBtn.setAttribute('data-target', '#modal');
    editBtn.onclick = () =>
      this.modal.setValues({
        id: todo.id,
        title: row.children[0].innerText,
        description: row.children[1].innerText,
        completed: row.children[2].children[0].checked,
      });
    row.children[3].appendChild(editBtn);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
    removeBtn.innerHTML = `<i class="fa fa-trash"></i>`;
    removeBtn.onclick = () => this.remuveTodo(todo.id);
    row.children[3].appendChild(removeBtn);
  }
}
