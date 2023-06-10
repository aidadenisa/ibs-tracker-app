import { getWeekDaysByDate, formattedDayName } from '../../src/services/utils';
/**
 * Cypress commands always return undefined, so button.click() in the above code would cause an error. An attempt to start the debugger would not stop the code between executing the commands, but before any commands have been executed.
 * Cypress commands are like promises, so if we want to access their return values, we have to do it using the then command. For example, the following test would print the number of buttons in the application, and click the first button:
 */
describe('Day Report', function() { 

  //I should be logged in for viewing this page => login using cy.request
  beforeEach(function() {
    cy.login({ email: 'initial@test.com', password: '123456' });
  });

  it('shows the current day', function() {
    expect(localStorage.getItem('token'));
    const date = new Date();
    cy.get('div[class*=DateHeader]').contains(date.getDate());
    cy.get('div[class*=DateHeader]').contains(new Intl.DateTimeFormat('en-GB', { month : 'long'}).format(date));
  });

  it('shows the current week correctly', function() {
    const date = new Date();
    const days = getWeekDaysByDate(date.toISOString());

    expect(days.length).to.eq(7);

    for(let i=0; i < days.length; i++) {
      cy.get('.week-calendar .week-calendar__day').contains((new Date(days[i])).getDate());
      cy.get('.week-calendar .week-calendar__day-name').contains(formattedDayName(days[i]));
    }

    const oneDayOffset = 24*60*60*1000; 
    const dayBeforeTheWeek = new Date( (new Date(days[0])).getTime() - oneDayOffset);
    const dayAfterTheWeek = new Date((new Date(days[days.length - 1])).getTime() + oneDayOffset);
    cy.get('div.week-calendar__day:first').should('not.eq', dayBeforeTheWeek.getDate());
    cy.get('div.week-calendar__day:last').should('not.eq', dayAfterTheWeek.getDate());
    cy.get('div.week-calendar__day-name:first').should('not.eq', formattedDayName(dayBeforeTheWeek.toISOString()));
    cy.get('div.week-calendar__day-name:last').should('not.eq', formattedDayName(dayAfterTheWeek.toISOString()));

  });

});