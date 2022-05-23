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
    const item = getItemsForChecklist().first();
    const checkbox = getCheckboxForItem();

    item.click();
    checkbox.should('have.class', 'checkbox-checked');
    item.click();
    checkbox.should('not.have.class', 'checkbox-checked');
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

    const firstItem = getItemsForChecklist().first();
    const secondItem = getItemsForChecklist().last();

    firstItem.click();
    secondItem.click();

    getResetButton().click();

    firstItem.should('not.have.class', 'checkbox-checked');
    secondItem.should('not.have.class', 'checkbox-checked');
  });
});
