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
    const item = getChecklistItems().first();
    const checkbox = getCheckboxForItem();

    item.click();
    checkbox.should('have.class', 'checkbox-checked');
    item.click();
    checkbox.should('not.have.class', 'aria-checked', 'false');
  });

  it('should remember item completion state', () => {
    const item = getItemsForChecklist().first();

    item.click();
    getChecklistBackButton().click();
    getChecklistItems().first().click();
    getCheckboxForItem().should('have.class', 'checkbox-checked');
  });
});
