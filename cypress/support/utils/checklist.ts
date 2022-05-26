import { getChecklistItems, navigateToHomePage } from './home';
import { createChecklist, getSaveButton, getTitleField } from './shared';

export const navigateToChecklistPage = (forChecklistTitle?: string) => {
  const testTitle = forChecklistTitle ?? 'preflight';

  navigateToHomePage();
  createChecklist(testTitle);
  getChecklistItems().first().click();
};

export const createChecklistItem = (title: string) => {
  getAddChecklistItemButton().click();
  getTitleField().type(title, { delay: 0 });
  getSaveButton().click();
};

export const editChecklistItem = (title: string) => {
  getTitleField().type(title, { delay: 0 });
  getSaveButton().click();
};

export const getResetButton = () => cy.get('[data-test="reset-items"]');

export const getChecklistBackButton = () =>
  cy.get('[data-test="checklist-back-button"]');

export const getChecklistDetailTitle = () =>
  cy.get('[data-test="checklist-detail-title"]');

export const getAddChecklistItemButton = () =>
  cy.get('[data-test="add-checklist-item-button"]');

export const getItemsForChecklist = () =>
  cy.get('[data-test="checklist-list-item"]');

export const getCheckboxForItem = () =>
  cy.get('[data-test="checklist-item-checkbox"]');

export const getDeleteChecklistItemButton = () =>
  cy.get('[data-test="delete-checklist-item"]');

export const getEditChecklistItemButton = () =>
  cy.get('[data-test="edit-checklist-item"]');
