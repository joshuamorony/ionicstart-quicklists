export const navigateToHomePage = () => cy.visit('/');
export const getAddChecklistButton = () =>
  cy.get('[data-test="add-checklist-button"]');
export const getChecklistItems = () => cy.get('[data-test="checklist-item"]');
