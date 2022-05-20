import { getChecklistItems } from './home';
import { createChecklist, getSaveButton, getTitleField } from './shared';

export const navigateToChecklistPage = (forChecklistTitle?: string) => {
  const testTitle = forChecklistTitle ?? 'preflight';
  createChecklist(testTitle);
  getChecklistItems().first().click();
};

export const createChecklistItem = (title: string) => {
  getAddChecklistItemButton().click();
  getTitleField().type(title, { delay: 0 });
  getSaveButton().click();
};

export const getChecklistDetailTitle = () =>
  cy.get('[data-test="checklist-detail-title"]');

export const getAddChecklistItemButton = () =>
  cy.get('[data-test="add-checklist-item-button"]');

export const getItemsForChecklist = () =>
  cy.get('[data-test="item-for-checklist"]');
