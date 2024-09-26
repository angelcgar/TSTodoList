export default class Filters {
  public form: HTMLFormElement;
  public btn: HTMLButtonElement;

  constructor() {
    this.form = document.getElementById('filters') as HTMLFormElement;
    this.btn = document.getElementById('search') as HTMLButtonElement;
  }

  onClick(callback) {
    this.btn.onclick = (e) => {
      e.preventDefault();
      const data = new FormData(this.form);
      callback({
        type: data.get('type'),
        words: data.get('words'),
      });
    };
  }
}
