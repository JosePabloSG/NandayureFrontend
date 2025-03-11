describe('Add Annuity', () => {
  beforeEach(() => {
    cy.session('sesion-rh', () => {
      cy.login('rh');
      cy.url().should('not.include', '/auth/login');
    });

    cy.visit('/');
    cy.get('[data-cy="sidebar-dashboard-home"]').should('be.visible');
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

  it('abre el modal de agregar anualidad', () => {
    cy.get('[data-cy="open-add-annuity-modal"]').click();
    cy.get('[data-cy="add-annuity-modal"]').should('be.visible');
    cy.get('[data-cy="modal-title"]').should('contain', 'Agregar Nueva Anualidad');
  });

  it('completa el formulario y envía la nueva anualidad', () => {
    cy.get('[data-cy="open-add-annuity-modal"]').click();
    
    cy.get('[data-cy="input-date"]').type('2025-02-25');
    cy.get('[data-cy="input-description"]').type('Pago anualidad prueba');
    cy.get('[data-cy="input-amount"]').type('5000');
    
    cy.get('[data-cy="select-employee"]').select('1'); // Ajusta el valor según la opción esperada

    cy.get('[data-cy="submit-annuity"]').click();

    cy.get('[data-cy="add-annuity-modal"]').should('not.exist');

    cy.contains('Pago anualidad prueba').should('exist');
  });
});
