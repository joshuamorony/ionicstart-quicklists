import {
  createChecklistItem,
  getCheckboxForItem,
  getItemsForChecklist,
  navigateToChecklistPage,
} from '../support/utils';

describe('Checklist page', () => {
  const testTitle = 'preflight';

  beforeEach(() => {
    navigateToChecklistPage(testTitle);
  });

  it('should be able to add an item to an individual checklist', () => {
    createChecklistItem(testTitle);
    getItemsForChecklist().should('contain.text', testTitle);
  });

  it('should be able to toggle item completion state', () => {
    createChecklistItem(testTitle);
    getCheckboxForItem().click();
    getCheckboxForItem().should('have.attr', 'checked', true);
    getCheckboxForItem().click();
    getCheckboxForItem().should('have.attr', 'checked', false);
  });
});
