import {
  createChecklistItem,
  editChecklistItem,
  getCheckboxForItem,
  getChecklistBackButton,
  getChecklistItems,
  getDeleteChecklistItemButton,
  getEditChecklistItemButton,
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

  it('should be able to delete a checklist item', () => {
    getDeleteChecklistItemButton().first().click({ force: true });
    getItemsForChecklist().should('not.exist');
  });

  it('should be able to edit a checklist item', () => {
    createChecklistItem(testTitle);
    cy.wait(500);
    getEditChecklistItemButton().first().click({ force: true });

    const editedTitle = 'newtitle';
    editChecklistItem(editedTitle);

    getItemsForChecklist().should('contain.text', editedTitle);
  });
});
