import {
  getAddChecklistButton,
  getCancelButton,
  getChecklistItems,
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
    getTitleField().type(testTitle);
    getSaveButton().click();

    getChecklistItems().should('contain.text', testTitle);
  });

  it('should be able to cancel adding a checklist', () => {
    const testTitle = 'preflight';

    getAddChecklistButton().click();
    getTitleField().type(testTitle);
    getCancelButton().click();

    getChecklistItems().should('not.contain.text', testTitle);
  });
});
