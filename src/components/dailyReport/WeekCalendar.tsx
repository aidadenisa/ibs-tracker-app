import { useDispatch, useSelector } from 'react-redux';
import { getFormattedDayName } from '../../services/utils';
import { RootState } from '../../store';
import { isSameDay } from 'date-fns';
import styles from './WeekCalendar.module.css';
import { setCurrentDay } from '../../reducers/currentDay';
import recordService from '../../services/records';
import { usePopulateUserRecords } from '../../hooks/records';
import { Category } from '../../types';

interface WeekCalendarProps {
  days: string[],
}

const WeekCalendar = ({ days }: WeekCalendarProps) => {

  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories);
  const currentDay = useSelector((state: RootState) => state.currentDay);
  const user = useSelector((state: RootState) => state.user)

  const formattedDate = (day: string): number => {
    return (new Date(day)).getDate();
  }

  const isCurrentDayClass = (day: string) => {
    return isSameDay(new Date(day), new Date(currentDay))
      ? styles.selected
      : '';
  }

  const getCategorizedRecordsForDay = (day: string) => {
    return usePopulateUserRecords(user, categories, new Date(day))
  }

  const getCategoryClassname = (category: Category) => {
    return `
      week-calendar__category 
      ${category.events.length && `ibs-category-${category.code.toLowerCase()}-inverted`}
      ${styles.categoryLine}`
  }

  const handleChangeDay = (day: string) => {
    dispatch(setCurrentDay(day))
    recordService.updateRecordsForCurrentDay(user);
  }

  return (
    <div className={`flexbox week-calendar ${styles.weekCalendar}`}>
      {days && days.length &&
        days.map((day, index) =>
          <div
            className={`${styles.slot} ${isCurrentDayClass(day)}`}
            key={index}
            onClick={() => handleChangeDay(day)}
          >
            <div className={`week-calendar__day`}>
              {formattedDate(day)}
            </div>
            <div className="week-calendar__day-name">{getFormattedDayName(day)}</div>
            {
              getCategorizedRecordsForDay(day).map(category =>
                <div
                  className={getCategoryClassname(category)}
                  key={category.id}
                ></div>
              )
            }
          </div>)
      }
    </div>
  )
}

export default WeekCalendar;