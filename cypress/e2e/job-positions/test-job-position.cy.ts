/**
 * @file Suite de pruebas para operaciones CRUD de puestos de trabajo.
 */

describe('Job Position Management Flow', () => {
  interface JobPositionData {
    name: string;
    description: string;
    baseSalary: string;
    globalSalary: string;
    extrafees: string;
    departmentId?: string;
    departmentIndex: number;
    updatedName: string; // Cambiado a requerido
  }

  // Usar una variable a nivel del contexto que persista entre pruebas
  let jobPositionId: string;
  let jobPositionData: JobPositionData;

  before(() => {
    // Load test data from fixture
    cy.fixture('jobPosition.json').then((data: Partial<JobPositionData>) => {
      // Asegurar que updatedName tenga un valor por defecto
      jobPositionData = {
        ...data,
        updatedName: `${data.name} editado`,
      } as JobPositionData;
    });
  });

  beforeEach(() => {
    // Set up authenticated session before each test
    cy.session('hr-user-session', () => {
      cy.login('rh');
      cy.url().should('not.include', '/auth/login');
    });

    // Navigate to dashboard
    cy.visit('/');
    cy.get('[data-cy="sidebar-dashboard-home"]').should('be.visible');
  });

  /**
   * Navega a la página de gestión de puestos de trabajo
   */
  const navigateToJobPositionPage = () => {
    cy.visit('/system-configuration/positions');
    cy.url().should('include', '/system-configuration/positions');
  };

  /**
   * @test Creación de un nuevo puesto de trabajo
   */
  it('should create a new job position and save its ID', () => {
    navigateToJobPositionPage();

    // Click the add button
    cy.get('[data-cy="btn-add-job-position"]')
      .first()
      .should('be.enabled')
      .click();

    // Verify modal is open
    cy.get('[data-cy="modal-add-job-position"]').should('be.visible');

    // Fill the form
    cy.get('[data-cy="input-name-add-job-position"]')
      .should('be.visible')
      .clear()
      .type(jobPositionData.name)
      .should('have.value', jobPositionData.name);

    cy.get('[data-cy="input-add-description-job-position"]')
      .should('be.visible')
      .clear()
      .type(jobPositionData.description)
      .should('have.value', jobPositionData.description);

    // Select department usando el índice
    cy.get('[data-cy="select-department-job-position"]').click();
    cy.wait(500); // Esperar a que el menú se abra

    // Seleccionar por índice
    cy.get('[role="option"]').eq(jobPositionData.departmentIndex).click();

    // Submit the form
    cy.get('[data-cy="btn-submit-add-job-position"]')
      .should('be.enabled')
      .click();

    // Esperar que la página se cargue completamente
    cy.wait(1000);

    // Buscar el registro usando el search bar
    cy.get('[data-cy="search-job-position"]')
      .first()
      .type(jobPositionData.name, { force: true });

    // Esperar que se filtren los resultados
    cy.wait(1000);

    // Verificar que el nuevo registro es visible y capturar su ID
    cy.contains('td', jobPositionData.name)
      .should('be.visible')
      .closest('tr')
      .within(() => {
        // Obtener y almacenar el ID creado
        cy.get('[data-cy^="jobPosition-id-"]')
          .first()
          .invoke('text')
          .then((id) => {
            const trimmedId = id.trim();
            expect(trimmedId).to.not.equal('');
            cy.wrap(trimmedId).as('savedJobPositionId');
            cy.log(`Created job position with ID: ${trimmedId}`);
          });
      });

    // Almacenar el ID para usarlo en pruebas posteriores
    cy.get('@savedJobPositionId').then((id) => {
      jobPositionId = String(id);
    });
  });

  /**
   * @test Edición de un puesto de trabajo existente
   */
  it('should edit an existing job position', () => {
    navigateToJobPositionPage();

    // Buscar el registro usando el search bar
    cy.get('[data-cy="search-job-position"]')
      .first()
      .should('be.visible')
      .clear()
      .type(jobPositionData.name, { force: true });

    // Esperar que se filtren los resultados y verificar que el registro existe
    cy.get(`[data-cy="jobPosition-name-${jobPositionId}"]`).should('be.visible');

    // Find the row with the job position and click the edit button
    cy.get(`[data-cy="jobPosition-id-${jobPositionId}"]`)
      .closest('tr')
      .within(() => {
        cy.get('[data-cy="btn-edit-job-position"]')
          .should('be.visible')
          .click();
      });

    // Verify edit modal is open and form is ready
    cy.get('[data-cy="modal-edit-job-position"]').should('be.visible');

    // Edit the name field
    cy.get('[data-cy="input-edit-name-job-position"]')
      .should('be.visible')
      .clear()
      .type(jobPositionData.updatedName, { force: true })
      .should('have.value', jobPositionData.updatedName);

    // Edit description
    cy.get('[data-cy="input-edit-description-job-position"]')
      .should('be.visible')
      .clear()
      .type(`${jobPositionData.description} editado`, { force: true })
      .should('have.value', `${jobPositionData.description} editado`);

    // Select new department
    cy.get('[data-cy="select-edit-department-job-position"]')
      .should('be.visible')
      .click();

    // Wait for select content to be visible and select the option
    cy.get('[role="listbox"]').should('be.visible');
    cy.get(`[data-cy^="select-edit-department-option-"]`).eq(jobPositionData.departmentIndex).click();

    // Submit the edit form
    cy.get('[data-cy="btn-edit-submit-job-position"]')
      .should('be.enabled')
      .click();

    // Wait for the changes to be saved
    cy.wait(1000);

    // Verify the changes
    cy.contains('td', jobPositionData.updatedName).should('be.visible');
  });

  /**
   * @test Eliminación de un puesto de trabajo
   */
  it('should delete a job position', () => {
    navigateToJobPositionPage();

    // Buscar el registro usando el search bar
    cy.get('[data-cy="search-job-position"]')
      .first()
      .type(jobPositionData.updatedName);

    // Esperar que se filtren los resultados
    cy.wait(500);

    // Find the row with the job position and click the delete button
    cy.get(`[data-cy="jobPosition-id-${jobPositionId}"]`)
      .closest('tr')
      .find('[data-cy="btn-delete-job-position"]')
      .first()
      .click();

    // Verify delete confirmation modal is open
    cy.get('[data-cy="modal-delete-job-position"]').should('be.visible');

    // Confirm deletion
    cy.get('[data-cy="btn-delete-confirm-job-position"]')
      .should('be.enabled')
      .click();

    // Wait for the deletion to complete
    cy.wait(1000);

    // Verify the record is no longer visible
    cy.contains('td', jobPositionData.updatedName).should('not.exist');
  });
});