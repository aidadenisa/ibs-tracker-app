import { getFormattedDayName } from '../../services/utils';

interface WeekCalendarProps {
  days: string[],
}

const WeekCalendar = ({ days }: WeekCalendarProps) => {

  const formattedDate = (day: string): number => {
    return (new Date(day)).getDate();
  }

  return (
    <div className="flexbox week-calendar">
      {days && days.length &&
        days.map((day, index) => <div key={index}>
          <div className="week-calendar__day">{formattedDate(day)}</div>
          <div className="week-calendar__day-name">{getFormattedDayName(day)}</div>
        </div>)
      }
    </div>
  )
}

export default WeekCalendar;