describe('Annuities Table', () => {
  beforeEach(() => {
    cy.session('sesion-rh', () => {
      cy.login('rh');
      cy.url().should('not.include', '/auth/login');
    });

    cy.visit('/');
    cy.get('[data-cy="annuities-table"]').should('be.visible');
  });

  it('navigation annuity', () => {
    cy.get('[data-cy="user-menu"]').first().click();
    cy.get('[data-cy="system-configuration-button"]').click();
    cy.url().should('include', '/system-configuration');
  })

  it('select annuty', () => {
    cy.get('[data-cy="sidebar-system-configuration-annuities"]').first().click();
    cy.url().should('include', '/system-configuration/annuities');
  })

  it('should load the annuities table with correct data', () => {

    cy.get('[data-cy^="table-row-"]').should('have.length.greaterThan', 0);

    cy.get('[data-cy="table-cell-id-1"]').should('be.visible');
    cy.get('[data-cy="table-cell-date-1"]').should('be.visible');
    cy.get('[data-cy="table-cell-description-1"]').should('be.visible');
    cy.get('[data-cy="table-cell-amount-1"]').should('be.visible');
    cy.get('[data-cy="table-cell-employee-1"]').should('be.visible');
  });

  it('should show the error message when annuities fail to load', () => {

    cy.intercept('GET', '/api/annuities', { statusCode: 500 }).as('getAnnuitiesError');

    cy.visit('/');
    
    cy.wait('@getAnnuitiesError');
    cy.get('[data-cy="error-loading"]').should('be.visible').and('contain', 'Error cargando datos de anualidades.');
  });

  it('should display the table headers correctly', () => {

    cy.get('[data-cy="table-head-id"]').should('be.visible');
    cy.get('[data-cy="table-head-date"]').should('be.visible');
    cy.get('[data-cy="table-head-description"]').should('be.visible');
    cy.get('[data-cy="table-head-amount"]').should('be.visible');
    cy.get('[data-cy="table-head-employee"]').should('be.visible');
    cy.get('[data-cy="table-head-actions"]').should('be.visible');
  });

  it('should show the edit and delete actions for each row', () => {

    cy.get('[data-cy="table-cell-actions-1"]').should('be.visible');

    cy.get('[data-cy="table-cell-actions-1"]').find('button').should('have.length', 2);
  });

  it('should show the annuity description correctly', () => {

    cy.get('[data-cy="table-cell-description-1"]').should('be.visible');
  });

  it('should show the annuity date in the correct format', () => {

    cy.get('[data-cy="table-cell-date-1"]').should('be.visible')
      .and('match', /(\d{2})\/(\d{2})\/(\d{4})/); 
  });

  it('should show the annuity amount with 2 decimal places', () => {

    cy.get('[data-cy="table-cell-amount-1"]').should('be.visible')
      .and('match', /^\d+(\.\d{2})?$/);
  });
});
