import {
  getAddChecklistButton,
  getCancelButton,
  getChecklistDetailTitle,
  getChecklistItems,
  getFormModal,
  getSaveButton,
  getTitleField,
  navigateToHomePage,
} from '../support/utils';

const createChecklist = (title: string) => {
  getAddChecklistButton().click();
  getTitleField().type(title, { delay: 0 });
  getSaveButton().click();
};

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
});
