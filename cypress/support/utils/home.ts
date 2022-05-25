export const navigateToHomePage = () => cy.visit('/');
export const getAddChecklistButton = () =>
  cy.get('[data-test="add-checklist-button"]');
export const getChecklistItems = () => cy.get('[data-test="checklist-item"]');
export const getDeleteChecklistButton = () =>
  cy.get('[data-test="delete-checklist"]');
export const getConfirmDeleteButton = () =>
  cy.get('[data-test="confirm-delete-button"]');
export const getCancelDeleteButton = () =>
  cy.get('[data-test="cancel-delete-button"]');
