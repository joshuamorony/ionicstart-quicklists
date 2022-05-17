import {
  getAddChecklistButton,
  getCancelChecklistButton,
  getChecklistItems,
  getSaveChecklistButton,
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
    getSaveChecklistButton().click();

    getChecklistItems().should('contain.text', testTitle);
  });

  it('should be able to cancel adding a checklist', () => {
    const testTitle = 'preflight';

    getAddChecklistButton().click();
    getTitleField().type(testTitle);
    getCancelChecklistButton().click();

    getChecklistItems().should('not.contain.text', testTitle);
  });
});
