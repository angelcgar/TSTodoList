import Alert from './alert';

type Callback = (title: string, description: string) => void;

export default class AddTodo {
  public btn: HTMLButtonElement;
  public title: HTMLInputElement;
  public description: HTMLInputElement;
  public alert: Alert;

  constructor() {
    this.btn = document.getElementById('add') as HTMLButtonElement;
    this.title = document.getElementById('title') as HTMLInputElement;
    this.description = document.getElementById(
      'description',
    ) as HTMLInputElement;

    this.alert = new Alert('alert');
  }

  onClick(callback: Callback) {
    this.btn.onclick = () => {
      if (this.title.value === '' || this.description.value === '') {
        this.alert.show('Title and description are required');
      } else {
        this.alert.hide();
        callback(this.title.value, this.description.value);
      }
    };
  }
}
