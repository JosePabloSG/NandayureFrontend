describe('Edit Annuity Modal', () => {
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

  it('should open edit modal when edit button is clicked', () => {
 
    cy.get('[data-cy="edit-button-1"]').should('be.visible');

    cy.get('[data-cy="edit-button-1"]').click();

    cy.get('[data-cy="edit-modal-1"]').should('be.visible');
    cy.get('[data-cy="edit-modal-title"]').should('contain', 'Editar Anualidad');
  });

  it('should fill form fields with existing annuity data', () => {

    cy.get('[data-cy="edit-button-1"]').click();


    cy.get('[data-cy="edit-date"]').should('have.value', '2025-02-01'); 
    cy.get('[data-cy="edit-description"]').should('have.value', 'Anualidad de prueba'); 
    cy.get('[data-cy="edit-amount"]').should('have.value', '1000.00'); 
    cy.get('[data-cy="edit-employee"]').should('have.value', '1');
  });

  it('should show error when form is submitted with invalid data', () => {

    cy.get('[data-cy="edit-button-1"]').click();
    

    cy.get('[data-cy="edit-description"]').clear();
    cy.get('[data-cy="edit-submit"]').click();

    cy.get('[data-cy="edit-description-error"]').should('contain', 'Este campo es obligatorio');
  });

  it('should submit form and close modal when data is valid', () => {

    cy.get('[data-cy="edit-button-1"]').click();
    
    cy.get('[data-cy="edit-description"]').clear().type('Nueva descripción de anualidad');
    cy.get('[data-cy="edit-amount"]').clear().type('1500.00');

    cy.get('[data-cy="edit-submit"]').click();

    cy.get('[data-cy="edit-modal-1"]').should('not.exist');

    cy.get('[data-cy="table-row-1"]').should('contain', 'Nueva descripción de anualidad');
    cy.get('[data-cy="table-row-1"]').should('contain', '1500.00');
  });
});
