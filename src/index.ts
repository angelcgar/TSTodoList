import './index.css';

import Model from './model';
import View from './view';

document.addEventListener('DOMContentLoaded', () => {
  const model = new Model();
  const view = new View();

  model.setView(view);
  view.setModel(model);
});
