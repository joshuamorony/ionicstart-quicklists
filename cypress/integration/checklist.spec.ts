import {
  createChecklistItem,
  getCheckboxForItem,
  getChecklistBackButton,
  getChecklistItems,
  getItemsForChecklist,
  navigateToChecklistPage,
} from '../support/utils';

describe('Checklist page', () => {
  const testTitle = 'preflight';

  beforeEach(() => {
    navigateToChecklistPage(testTitle);
    createChecklistItem(testTitle);
  });

  it('should be able to add an item to an individual checklist', () => {
    getItemsForChecklist().should('contain.text', testTitle);
  });

  it('should be able to toggle item completion state', () => {
    getCheckboxForItem().click();
    getCheckboxForItem().should('have.attr', 'aria-checked', 'true');
    getCheckboxForItem().click();
    getCheckboxForItem().should('have.attr', 'aria-checked', 'false');
  });

  it('should remember item completion state', () => {
    getCheckboxForItem().click();
    getChecklistBackButton().click();
    getChecklistItems().first().click();
    getCheckboxForItem().should('have.attr', 'aria-checked', 'true');
  });
});
