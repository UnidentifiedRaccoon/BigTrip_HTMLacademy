export const renderMethods = {
  PREPEND: 'prepend',
  APPEND: 'append',
};

export const createElement = (template) => {
  const div = document.createElement('div');
  div.innerHTML = template.trim();
  return div.firstChild;
};

export const render = (container, component, method = 'append') => {
  const element = component.getElement();
  switch (method) {
    case renderMethods.APPEND:
      container.append(element);
      break;
    case renderMethods.PREPEND:
      container.prepend(element);
      break;
    default:
      container.append(element);
      break;
  }
};

export const replace = (oldContent, newContent) => {
  oldContent.getElement().replaceWith(newContent.getElement());
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
