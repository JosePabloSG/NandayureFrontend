/**
 * @fileoverview Suite de pruebas para la página de inicio de sesión
 * @description Conjunto de pruebas end-to-end utilizando Cypress para validar
 * la funcionalidad de la página de login, incluyendo casos exitosos, errores
 * y validaciones.
 */

describe('Login Page', () => {
  /**
   * Hook que se ejecuta antes de cada prueba
   * @description Navega a la página de login antes de ejecutar cada test
   */
  beforeEach(() => {
    cy.visit('/auth/login');
  });

  /**
   * @description Verifica el proceso de inicio de sesión con credenciales válidas
   * @test Debe iniciar sesión exitosamente cuando se proporcionan credenciales correctas
   */
  it('should login with valid credentials', () => {
    cy.login('rh');
    cy.url().should('include', '/');
  });
  /**
   * @description Prueba el manejo de credenciales inválidas
   * @test Debe mostrar un mensaje de error cuando se ingresan credenciales incorrectas
   * @test Debe mantener al usuario en la página de login
   */
  it('should show error for invalid credentials', () => {
    cy.get('[data-cy="login-input-id"]').clear().type('adriana');
    cy.get('[data-cy="login-input-password"]').clear().type('invalidPassword', {
      log: false,
    });
    cy.get('[data-cy="login-button"]').click();

    cy.get('p.text-red-500').should('be.visible');
    cy.url().should('include', '/auth/login');
  });

  /**
   * @description Valida el comportamiento del formulario cuando se envía sin datos
   * @test Debe mostrar mensajes de validación cuando los campos están vacíos
   * @test Debe prevenir el envío del formulario
   * @test Debe mantener al usuario en la página de login
   */
  it('should show validation errors when fields are empty', () => {
    cy.get('[data-cy="login-button"]').click();

    cy.get('input[data-cy="login-input-id"]').parent();
    cy.get('input[data-cy="login-input-password"]').parent();
    cy.get('p.text-red-500').should('be.visible');

    cy.url().should('include', '/auth/login');
  });

});
