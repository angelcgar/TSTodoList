export default class Alert {
  public alertDiv: HTMLDivElement;

  constructor(alertId: string) {
    this.alertDiv = document.getElementById(alertId) as HTMLDivElement;
  }

  show(message: string) {
    this.alertDiv.classList.remove('d-none');
    this.alertDiv.innerText = message;
  }

  hide() {
    this.alertDiv.classList.add('d-none');
  }
}
