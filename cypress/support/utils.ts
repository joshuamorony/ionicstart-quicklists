// Shared

// Home
export const navigateToHomePage = () => cy.visit('/');
export const getAddChecklistButton = () =>
  cy.get('[data-test="add-checklist-button"]');
export const getChecklistItems = () => cy.get('[data-test="checklist-item"]');

// Add Checklist
export const getTitleField = () => cy.get('[data-test="title-input"] input');
export const getSaveChecklistButton = () =>
  cy.get('[data-test="save-checklist-button"]');
