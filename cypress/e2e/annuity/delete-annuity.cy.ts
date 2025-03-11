describe('Delete Annuity Modal', () => {
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

  it('should open delete modal when delete button is clicked', () => {
    
    cy.get('[data-cy="delete-button-1"]').click();
    
    cy.get('[data-cy="delete-modal-1"]').should('be.visible');
    cy.get('[data-cy="delete-modal-title"]').should('contain', 'Confirmar Eliminación');
    cy.get('[data-cy="delete-modal-description"]').should('contain', '¿Estás seguro de que quieres eliminar esta anualidad?');
  });

  it('should close delete modal when cancel is clicked', () => {
    cy.get('[data-cy="delete-button-1"]').click();

    cy.get('[data-cy="delete-modal-1"]').should('be.visible');

    cy.get('[data-cy="delete-cancel-button"]').click();

    cy.get('[data-cy="delete-modal-1"]').should('not.exist');
  });

  it('should call confirmDelete when confirm delete button is clicked', () => {
    cy.get('[data-cy="delete-button-1"]').click();

    cy.get('[data-cy="delete-modal-1"]').should('be.visible');

    cy.get('[data-cy="delete-confirm-button"]').click();

    cy.get('[data-cy="table-row-1"]').should('not.exist');
  });

  it('should not delete annuity if cancel button is clicked', () => {
    cy.get('[data-cy="delete-button-1"]').click();

    cy.get('[data-cy="delete-cancel-button"]').click();

    cy.get('[data-cy="table-row-1"]').should('be.visible');
  });
});
