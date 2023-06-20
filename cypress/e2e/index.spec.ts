// Basic test to check if the page loads and cypress is working
describe('Basic', () => {
  it('Loads the homepage', () => {
    cy.visit('/');

    cy.title().should('eq', 'DRG Editor');
    cy.findByText('/phillipe-rockade/drg-editor')
      .should('exist')
      .and('be.visible');
  });
});
