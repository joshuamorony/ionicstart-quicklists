import {
  getAddChecklistButton,
  getCancelButton,
  getChecklistItems,
  getFormModal,
  getSaveButton,
  getTitleField,
  navigateToHomePage,
} from '../support/utils';

describe('Home', () => {
  beforeEach(() => {
    navigateToHomePage();
  });

  it('should be able to create a checklist', () => {
    const testTitle = 'preflight';

    getAddChecklistButton().click();
    getTitleField().type(testTitle, { delay: 0 });
    getSaveButton().click();

    getChecklistItems().should('contain.text', testTitle);
  });

  it('should be able to cancel adding a checklist', () => {
    getAddChecklistButton().click();
    getCancelButton().click();

    getFormModal().should('not.exist');
  });
});
