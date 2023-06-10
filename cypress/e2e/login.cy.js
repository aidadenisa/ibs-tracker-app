describe('Login - IBS Tracker', () => {

  beforeEach(function(){
    cy.visit('/login');
  })
  
  // Mocha recommends to not use arrow functions when declaring a test function
  it('login page can be opened', function() {
    cy.contains('Login');
    cy.contains('Create new account');
  });

  it('can write input in the login fields', function() {
    // cy.get('input:first').type('laura@test.com');
    // cy.get('input:last').type('123456');
    cy.get('#ibs-input-email').type('laura@test.com');
    cy.get('#ibs-input-pass').type('laura@test.com');
  });

  it('should not be able to login with an empty user and pass', function() {
    cy.get('button:first').should('be.disabled');
  });

  it('should show an error message when user not found', function() {
    cy.intercept('POST', '/auth/login').as('login');

    cy.get('#ibs-input-email').type('laura@test.com');
    cy.get('#ibs-input-pass').type('3413c1');
    cy.get('button:first').click();
  
    //wait for the real request
    cy.wait('@login');

    cy.contains('Error');
    cy.contains('User not found');
  });

  it('should login a user if the email and password match', function() {
    cy.intercept('POST', '/auth/login').as('login');

    cy.get('#ibs-input-email').type('initial@test.com');
    cy.get('#ibs-input-pass').type('123456');
    cy.get('button:first').click();

    cy.wait('@login');
    cy.wait(1000);
    
    cy.get('.day-report')
  });
})