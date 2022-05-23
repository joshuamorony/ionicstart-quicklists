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
    checkbox.should('have.attr', 'aria-checked', 'true');
    item.click();
    checkbox.should('have.attr', 'aria-checked', 'false');
  });

  it('should remember item completion state', () => {
    const item = getItemsForChecklist().first();
    const checkbox = getCheckboxForItem();

    item.click();
    getChecklistBackButton().click();
    getChecklistItems().first().click();
    checkbox.should('have.attr', 'aria-checked', 'true');
  });
});
