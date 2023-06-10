import { formattedDayName } from '../../services/utils';

const WeekCalendar = ({ days }) => {

  const formattedDate = (day) => {
    return (new Date(day)).getDate();
  }

  return (
    <div className="flexbox week-calendar">
      {days && days.length &&
        days.map((day, index) => <div key={index}>
          <div className="week-calendar__day">{formattedDate(day)}</div>
          <div className="week-calendar__day-name">{formattedDayName(day)}</div>
        </div>)
      }
    </div>
  )
}

export default WeekCalendar;