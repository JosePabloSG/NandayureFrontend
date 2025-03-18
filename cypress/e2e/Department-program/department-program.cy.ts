function navigateToDepartmentProgramsTab() {
  cy.visit('/system-configuration/departments');

  cy.get('[role="tab"]')
    .contains('Programas Departamentales')
    .should('be.visible')
    .click();

  cy.contains('Programas Departamentales', { timeout: 10000 }).should('be.visible');

  cy.intercept('GET', '**/api/v1/department-programs*').as('getDepartmentPrograms');
  cy.wait('@getDepartmentPrograms', { timeout: 20000 });
  
  cy.get('[role="status"]').should('not.exist', { timeout: 10000 });
  
  cy.wait(2000);
}

describe('Flujo de gestión de Programas Departamentales', () => {
  let departmentProgramId = 1;

  const testData = {
    programName: 'Programa Test Cypress',
    updatedProgramName: 'Programa Test Actualizado'
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

  it('Visualizar Programas Departamentales', function () {
    navigateToDepartmentProgramsTab();

    cy.get('[data-cy="department-program-list"]').should('be.visible');
    
    cy.get('table thead th').should('have.length.at.least', 3);
    
    cy.get('table tbody tr').then($rows => {
      if ($rows.length > 0 && !$rows.find('td[colspan]').length) {
        cy.get('table tbody tr').first().find('td').eq(1).invoke('text').then((programName) => {
          if (programName && programName.trim() !== '') {
            cy.get('[data-cy="search-department-program"]').should('exist').as('searchInput');
            
            cy.get('@searchInput').clear().type(programName);
            
            cy.wait(1000);
            
            cy.get('table tbody tr').should('contain', programName);
            
            cy.get('@searchInput').clear();
            
            cy.wait(1000);
          } else {
            cy.log('El campo nombre está vacío, no se puede probar la búsqueda');
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

  it('Crear Programa Departamental', function () {
    navigateToDepartmentProgramsTab();

    cy.intercept('POST', '**/api/v1/department-programs').as('createDepartmentProgram');

    cy.get('button').contains('Agregar Programa Departamental')
      .should('exist')
      .and('be.visible')
      .click();

    cy.contains('Agregar Nuevo Programa Departamental', { timeout: 8000 })
      .should('be.visible');

    cy.get('input#name')
      .should('be.visible')
      .type(testData.programName)
      .should('have.value', testData.programName);

    cy.contains('button', 'Agregar programa departamental')
      .should('not.be.disabled')
      .click();

    cy.wait('@createDepartmentProgram', { timeout: 15000 }).then((interception) => {
      if (interception.response?.statusCode === 200 || interception.response?.statusCode === 201) {
        if (interception.response.body && interception.response.body.id) {
          departmentProgramId = interception.response.body.id;
          cy.log(`Programa Departamental creado con ID: ${departmentProgramId}`);
          
          this.departmentProgramId = departmentProgramId;
        }
      }
    });

    cy.contains('Agregar Nuevo Programa Departamental').should('not.exist', { timeout: 10000 });
    
    cy.contains(testData.programName).should('be.visible');
  });

  it('Editar Programa Departamental', function () {
    const savedId = this.departmentProgramId || departmentProgramId;
    
    navigateToDepartmentProgramsTab();

    cy.intercept({
      method: /PUT|PATCH/,
      url: '**/api/v1/department-programs/**'
    }).as('updateDepartmentProgram');

    cy.get('body').then($body => {
      const specificButton = $body.find(`[data-cy="edit-department-program-${savedId}"]`);
      
      if (specificButton.length > 0) {
        cy.wrap(specificButton).click();
      } else {
        cy.log('No se encontró el botón específico, usando el primero disponible');
        cy.get('[data-cy^="edit-department-program-"]').first().click();
      }
    });

    cy.contains('Editar Programa Departamental', { timeout: 8000 })
      .should('be.visible');

    cy.get('[data-cy="edit-input-program-name"]')
      .clear()
      .type(testData.updatedProgramName)
      .should('have.value', testData.updatedProgramName);

    cy.get('[data-cy="submit-edit-department-program"]')
      .should('be.visible')
      .click();

    cy.wait('@updateDepartmentProgram', { timeout: 10000 });

    cy.contains('Editar Programa Departamental')
      .should('not.exist', { timeout: 8000 });
      
    cy.contains(testData.updatedProgramName).should('be.visible');
  });

  it('Eliminar Programa Departamental', function () {
    const savedId = this.departmentProgramId || departmentProgramId;
    
    navigateToDepartmentProgramsTab();

    cy.intercept('DELETE', '**/api/v1/department-programs/**').as('deleteDepartmentProgram');

    cy.contains('tr', testData.updatedProgramName).within(() => {
      cy.get('button').eq(1).click();
    });

    cy.contains('Confirmar Eliminación', { timeout: 5000 })
      .should('be.visible');

    cy.contains('button', 'Eliminar')
      .should('be.visible')
      .click();

    cy.wait('@deleteDepartmentProgram', { timeout: 10000 });
    
    cy.contains('Confirmar Eliminación')
      .should('not.exist', { timeout: 8000 });

    cy.reload();
    cy.wait('@getDepartmentPrograms', { timeout: 10000 });
    cy.contains(testData.updatedProgramName).should('not.exist', { timeout: 15000 });
  });
  
  after(() => {
    cy.visit('/');
    cy.logout();
    cy.url().should('include', '/auth/login');
  });
});