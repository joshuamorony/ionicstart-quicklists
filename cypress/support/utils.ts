// Shared
export const getFormModal = () => cy.get('app-form-modal');

// Home
export const navigateToHomePage = () => cy.visit('/');
export const getAddChecklistButton = () =>
  cy.get('[data-test="add-checklist-button"]');
export const getChecklistItems = () => cy.get('[data-test="checklist-item"]');

// Checklist detail
export const getChecklistDetailTitle = () =>
  cy.get('[data-test="checklist-detail-title"]');

// Form modal
export const getTitleField = () => cy.get('[data-test="title"] input');
export const getSaveButton = () => cy.get('[data-test="form-modal-save"]');
export const getCancelButton = () => cy.get('[data-test="form-modal-cancel"]');
