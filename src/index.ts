import Model from './model';
import View from './view';

import './index.css';

document.addEventListener('DOMContentLoaded', () => {
  const model = new Model();
  const view = new View();

  model.setView(view);
  view.setModel(model);

  view.render();
});
