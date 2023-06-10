import { getWeekDaysByDate, formattedDayName } from '../../src/services/utils';

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

    const element = cy.get('.week-calendar')
    for(let i=0; i < days.length; i++) {
      element.get('.week-calendar__day').contains((new Date(days[i])).getDate());
      element.get('.week-calendar__day-name').contains(formattedDayName(days[i]));
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