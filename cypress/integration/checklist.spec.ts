import {
  createChecklistItem,
  getCheckboxForItem,
  getChecklistBackButton,
  getChecklistItems,
  getItemsForChecklist,
  getResetButton,
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
    getItemsForChecklist().first().click();
    getCheckboxForItem().should('have.class', 'checkbox-checked');
    getItemsForChecklist().first().click();
    getCheckboxForItem().should('not.have.class', 'checkbox-checked');
  });

  it('should remember item completion state', () => {
    const item = getItemsForChecklist().first();

    item.click();
    getChecklistBackButton().click();
    getChecklistItems().first().click();
    getCheckboxForItem().should('have.class', 'checkbox-checked');
  });

  it('should be able to reset all items to unchecked state', () => {
    createChecklistItem(testTitle);

    getItemsForChecklist().first().click();
    getItemsForChecklist().last().click();

    getResetButton().click();

    getCheckboxForItem().first().should('not.have.class', 'checkbox-checked');
    getCheckboxForItem().last().should('not.have.class', 'checkbox-checked');
  });
});
