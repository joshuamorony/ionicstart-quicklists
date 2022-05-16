import {
  getAddChecklistButton,
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
});
