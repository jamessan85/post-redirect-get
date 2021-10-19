/* eslint-disable no-undef */
/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Submit field APP', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000');
  });

  it('displays an error message on submit max length invalid', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get('input[name="text"]').should('be.visible');
    cy.get('input[name="text"]').should('be.empty');
    cy.get('input[name="text"]').type('0123456789A');
    cy.get('button').click();
    cy.get('[data-cy=error-container]').should('be.visible');
  });
  it('displays an error message field required', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get('input[name="text"]').should('be.visible');
    cy.get('input[name="text"]').should('be.empty');
    cy.get('input[name="text"]').clear();
    cy.get('button').click();
    cy.get('[data-cy=error-container]').should('be.visible');
    cy.get('[data-cy=error-container]').contains('text not found in request body');
  });
  it('removes the error message when page reloaded but keeps form data', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get('input[name="text"]').should('be.visible');
    cy.get('input[name="text"]').should('be.empty');
    cy.get('input[name="text"]').type('0123456789A');
    cy.get('button').click();
    cy.get('[data-cy=error-container]').should('be.visible');
    cy.visit('http://localhost:3000');
    cy.get('input[name="text"]').should('have.value', '0123456789A');
    cy.get('[data-cy=error-container]').should('not.exist');
  });
  it('submits the form succesfully', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get('input[name="text"]').should('be.visible');
    cy.get('input[name="text"]').should('be.empty');
    cy.get('input[name="text"]').type('0123456789');
    cy.get('button').click();
    cy.get('h1').contains('Succesfully submitted form data');
  });
  it('redirects to the index page if page refreshed on success page', () => {
    cy.get('input[name="text"]').should('be.visible');
    cy.get('input[name="text"]').should('be.empty');
    cy.get('input[name="text"]').type('0123456789');
    cy.get('button').click();
    cy.get('h1').contains('Succesfully submitted form data');
    cy.reload();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
