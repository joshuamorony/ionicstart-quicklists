import {
  createChecklist,
  editChecklist,
  getAddChecklistButton,
  getCancelButton,
  getCancelDeleteButton,
  getChecklistDetailTitle,
  getChecklistItems,
  getConfirmDeleteButton,
  getDeleteChecklistButton,
  getEditChecklistButton,
  getFormModal,
  navigateToHomePage,
} from '../support/utils';

describe('Home', () => {
  beforeEach(() => {
    navigateToHomePage();
  });

  it('should be able to create a checklist', () => {
    const testTitle = 'preflight';
    createChecklist(testTitle);
    getChecklistItems().should('contain.text', testTitle);
  });

  it('should be able to cancel adding a checklist', () => {
    getAddChecklistButton().click();
    getCancelButton().click();

    getFormModal().should('not.exist');
  });

  it('should be able to to navigate to the detail page for a checklist', () => {
    const testTitle = 'preflight';
    createChecklist(testTitle);
    getChecklistItems().first().click();
    getChecklistDetailTitle().should('contain.text', testTitle);
  });

  it('should be able to delete a checklist', () => {
    const testTitle = 'preflight';
    createChecklist(testTitle);
    getDeleteChecklistButton().first().click({ force: true });
    getConfirmDeleteButton().click();
    getChecklistItems().should('not.exist');
  });

  it('should be able to cancel deleting a checklist', () => {
    const testTitle = 'preflight';
    createChecklist(testTitle);
    getDeleteChecklistButton().first().click({ force: true });
    getCancelDeleteButton().click();
    getChecklistItems().should('contain.text', testTitle);
  });

  it('should be able to edit a checklist', () => {
    const testTitle = 'preflight';
    createChecklist(testTitle);
    getEditChecklistButton().first().click({ force: true });

    const editedTitle = 'newtitle';
    editChecklist(editedTitle);

    getChecklistItems().should('contain.text', editedTitle);
  });
});
