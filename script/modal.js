const modalTemplateEl = document.getElementById('modal-template'); //has backdrop + modal divs
const contentTemplateEl = document.getElementById('loading-modal-content'); //
const modalElements = document.importNode(modalTemplateEl.content, true); //Take the backdrop+modal divs
const modalElement = modalElements.querySelector('.modal'); //split them into 2 consts
const backdropElement = modalElements.querySelector('.backdrop'); //..
const contentElement = document.importNode(contentTemplateEl.content, true); //Take the second template

export function showModal() {
  modalElement.appendChild(contentElement); //Add the modal to template itself
  document.body.insertAdjacentElement('afterbegin', modalElement);
  document.body.insertAdjacentElement('afterbegin', backdropElement);
};

export function hideModal() {
      document.body.removeChild(modalElement);
      document.body.removeChild(backdropElement);

}
