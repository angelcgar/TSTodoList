import { Todo } from '../interface';
import { SetTodo } from '../interface/Todo';
import Alert from './alert';

type Callback = (title?: number, description?: SetTodo) => void;

export default class Modal {
  public title: HTMLInputElement;
  public description: HTMLTextAreaElement;
  public btn: HTMLButtonElement;
  public completed: HTMLInputElement;
  public modalDiv: HTMLDivElement;
  public todo: Todo | null;
  public alert: Alert;

  constructor() {
    this.title = document.getElementById('modal-title') as HTMLInputElement;
    this.description = document.getElementById(
      'modal-description',
    ) as HTMLTextAreaElement;
    this.btn = document.getElementById('modal-btn') as HTMLButtonElement;
    this.completed = document.getElementById(
      'modal-completed',
    ) as HTMLInputElement;
    this.modalDiv = document.getElementById('modal') as HTMLDivElement;

    this.alert = new Alert('modal-alert');
    this.todo = null;
  }

  setValues(todo: Todo) {
    this.todo = todo;
    this.title.value = todo.title;
    this.description.value = todo.description;
    this.completed.checked = todo.completed;
  }

  onClick(callback: Callback) {
    this.btn.onclick = () => {
      if (this.title.value === '' || this.description.value === '') {
        this.alert.show('Title and description are required');
        return;
      }

      $('#modal').modal('toggle');

      callback(this.todo?.id, {
        title: this.title.value,
        description: this.description.value,
        completed: this.completed.checked,
      });
    };
  }
}
