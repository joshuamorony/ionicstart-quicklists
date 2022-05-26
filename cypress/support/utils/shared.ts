import { getAddChecklistButton } from './home';

export const createChecklist = (title: string) => {
  getAddChecklistButton().click();
  getTitleField().type(title, { delay: 0 });
  getSaveButton().click();
};

export const editChecklist = (title: string) => {
  getTitleField().type(title, { delay: 0 });
  getSaveButton().click();
};

// Form modal
export const getFormModal = () => cy.get('app-form-modal');
export const getTitleField = () => cy.get('[data-test="title"] input');
export const getSaveButton = () => cy.get('[data-test="form-modal-save"]');
export const getCancelButton = () => cy.get('[data-test="form-modal-cancel"]');
