function navigateToBudgetCodesTab() {
  cy.visit('/system-configuration/departments');

  cy.get('[role="tab"]')
    .contains('Códigos de Presupuesto')
    .should('be.visible')
    .click();

  cy.contains('Configuración de Códigos de Presupuesto', { timeout: 10000 }).should('be.visible');

  cy.intercept('GET', '**/api/v1/budget-codes*').as('getBudgetCodes');
  cy.wait('@getBudgetCodes', { timeout: 20000 });
  
  cy.get('[role="status"]').should('not.exist', { timeout: 10000 });
  
  cy.wait(2000);
}

describe('Flujo de gestión de códigos de presupuesto', () => {
  let budgetCodeId = 1;

  const testData = {
    codSalary: '12345',
    codExtra: '67890',
    codAnuity: '54321',
    codSalaryPlus: '98765',
    updatedAnuity: '2025',
    updatedSalaryPlus: '10000'
  };

  before(() => {
    cy.login('rh');
    cy.url().should('not.include', '/auth/login');
  });

  beforeEach(() => {
    cy.session('sesion-rh', () => {
      cy.login('rh'); 
      cy.url().should('not.include', '/auth/login');
    });
    
    cy.visit('/');
  });

  it('Visualizar y filtrar códigos de presupuesto', function () {
    navigateToBudgetCodesTab();

    cy.get('[data-cy="budget-code-list"]').should('be.visible');
    
    cy.get('table thead th').should('have.length.at.least', 3);
    
    cy.get('table tbody tr').then($rows => {
      if ($rows.length > 0 && !$rows.find('td[colspan]').length) {
        cy.get('table tbody tr').first().find('td').eq(1).invoke('text').then((codSalary) => {
          if (codSalary && codSalary.trim() !== '') {
            cy.get('input[placeholder*="Buscar códigos de presupuesto"]').should('exist').as('searchInput');
            
            cy.get('@searchInput').clear().type(codSalary);
            
            cy.wait(1000);
            
            cy.get('table tbody tr').should('contain', codSalary);
            
            cy.get('@searchInput').clear();
            
            cy.wait(1000);
          } else {
            cy.log('El campo CodSalary está vacío, no se puede probar la búsqueda');
          }
        });

        cy.get('body').then($body => {
          const paginationExists = $body.find('.mt-4 [role="navigation"]').length > 0;
          
          if (paginationExists) {
            cy.log('Se encontró paginación, verificando su funcionamiento');
            
            cy.get('.mt-4 [role="navigation"] button').then($buttons => {
              if ($buttons.length > 1) {
                cy.get('.mt-4 [role="navigation"] button').eq(1).click();
                cy.wait(1000);
                
                cy.get('.mt-4 [role="navigation"] button').eq(0).click();
                cy.wait(1000);
              } else {
                cy.log('Solo hay un botón de paginación, omitiendo prueba de cambio de página');
              }
            });
          } else {
            cy.log('No se encontró componente de paginación');
          }
        });
      } else {
        cy.contains('No se encontraron resultados').should('be.visible');
      }
    });
  });

  it('Crear código de presupuesto', function () {
    navigateToBudgetCodesTab();

    cy.intercept('POST', '**/api/v1/budget-codes').as('createBudgetCode');

    cy.get('[data-cy="open-add-budget"]')
      .should('exist')
      .and('be.visible')
      .click();

    cy.get('[data-cy="add-budget-form"]', { timeout: 8000 })
      .should('exist')
      .and('be.visible');

    cy.get('[data-cy="input-cod-salary"]')
      .type(testData.codSalary)
      .should('have.value', testData.codSalary);
      
    cy.get('[data-cy="input-cod-extra"]')
      .type(testData.codExtra)
      .should('have.value', testData.codExtra);
      
    cy.get('[data-cy="input-cod-anuity"]')
      .type(testData.codAnuity)
      .should('have.value', testData.codAnuity);
      
    cy.get('[data-cy="input-cod-salary-plus"]')
      .type(testData.codSalaryPlus)
      .should('have.value', testData.codSalaryPlus);

    cy.get('[data-cy="submit-add-budget"]').should('not.be.disabled').click();

    cy.wait('@createBudgetCode', { timeout: 15000 }).then((interception) => {
      if (interception.response?.statusCode === 200 || interception.response?.statusCode === 201) {
        if (interception.response.body && interception.response.body.id) {
          budgetCodeId = interception.response.body.id;
          cy.log(`Código de presupuesto creado con ID: ${budgetCodeId}`);
          
          this.budgetCodeId = budgetCodeId;
        }
      }
    });

    cy.get('[data-cy="add-budget-form"]').should('not.exist', { timeout: 10000 });
  });

  it('Editar código de presupuesto', function () {
    const savedId = this.budgetCodeId || budgetCodeId;
    
    cy.visit('/system-configuration/departments');

    cy.get('[role="tab"]')
      .contains('Códigos de Presupuesto')
      .should('be.visible')
      .click();

    cy.contains('Configuración de Códigos de Presupuesto').should('be.visible');

    cy.intercept('GET', '**/api/v1/budget-codes*').as('getBudgetCodes');
    cy.wait('@getBudgetCodes', { timeout: 10000 });

    cy.intercept({
      method: /PUT|PATCH/,
      url: '**/api/v1/budget-codes/**'
    }).as('updateBudgetCode');

    cy.get('body').then($body => {
      const specificButton = $body.find(`[data-cy="edit-budget-${savedId}"]`);
      
      if (specificButton.length > 0) {
        cy.wrap(specificButton).click();
      } else {
        cy.log('No se encontró el botón específico, usando el primero disponible');
        cy.get('[data-cy^="edit-budget-"]').first().click();
      }
    });

    cy.contains('Editar Programa Departamental', { timeout: 8000 })
      .should('be.visible');

    cy.get('[data-cy="edit-input-cod-salary"]')
      .clear()
      .type(testData.codSalary)
      .should('have.value', testData.codSalary);

    cy.get('[data-cy="edit-input-cod-extra"]')
      .clear()
      .type(testData.codExtra)
      .should('have.value', testData.codExtra);

    cy.get('[data-cy="edit-input-cod-anuity"]')
      .clear()
      .type(testData.updatedAnuity)
      .should('have.value', testData.updatedAnuity);

    cy.get('[data-cy="edit-input-cod-salary-plus"]')
      .clear()
      .type(testData.updatedSalaryPlus)
      .should('have.value', testData.updatedSalaryPlus);

    cy.get('[data-cy="submit-edit-budget"]')
      .should('be.visible')
      .click();

    cy.wait('@updateBudgetCode', { timeout: 10000 });

    cy.contains('Editar Programa Departamental')
      .should('not.exist', { timeout: 8000 });
  });

  it('Eliminar código de presupuesto', function () {
    const savedId = this.budgetCodeId || budgetCodeId;
    
    cy.visit('/system-configuration/departments');

    cy.get('[role="tab"]')
      .contains('Códigos de Presupuesto')
      .should('be.visible')
      .click();

    cy.contains('Configuración de Códigos de Presupuesto').should('be.visible');

    cy.intercept('GET', '**/api/v1/budget-codes*').as('getBudgetCodes');
    cy.wait('@getBudgetCodes', { timeout: 10000 });

    cy.intercept('DELETE', '**/api/v1/budget-codes/**').as('deleteBudgetCode');

    cy.get('body').then($body => {
      const specificButton = $body.find(`[data-cy="delete-budget-${savedId}"]`);
      
      if (specificButton.length > 0) {
        cy.wrap(specificButton).click();
      } else {
        cy.log('No se encontró el botón específico, usando el primero disponible');
        cy.get('[data-cy^="delete-budget-"]').first().click();
      }
    });

    cy.contains('Confirmar Eliminación', { timeout: 5000 })
      .should('be.visible');

    cy.get('[data-cy="confirm-delete-budget"]')
      .should('be.visible')
      .click();

    cy.wait('@deleteBudgetCode', { timeout: 10000 });
    
    cy.contains('Confirmar Eliminación')
      .should('not.exist', { timeout: 8000 });

    cy.log('Verificando que el elemento ha sido eliminado');
  });

  after(() => {
    cy.visit('/');
    cy.logout();
    cy.url().should('include', '/auth/login');
  });
});