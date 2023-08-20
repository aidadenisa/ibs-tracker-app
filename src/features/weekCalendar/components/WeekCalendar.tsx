import { useDispatch, useSelector } from 'react-redux';
import { isSameDay } from 'date-fns';
import { Category } from '@/types';
import { RootState } from '@/store';
import { getFormattedDayName } from '@/features/weekCalendar/utils';
import { setCurrentDay } from '@/features/dayReport/reducers/currentDay';
import styles from '@/features/weekCalendar/components/styles/WeekCalendar.module.css';

// TODO: think better about how to achieve this without coupling this service here
import recordService from '@/features/records/services/records';

interface WeekCalendarProps {
  days: string[],
}

const WeekCalendar = ({ days }: WeekCalendarProps) => {

  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories);
  const currentDay = useSelector((state: RootState) => state.currentDay);
  const records = useSelector((state: RootState) => state.records)

  const formattedDate = (day: string): number => {
    return (new Date(day)).getDate();
  }

  const isCurrentDayClass = (day: string) => {
    return isSameDay(new Date(day), new Date(currentDay))
      ? styles.selected
      : '';
  }

  const getCategorizedRecordsForDay = (day: string) => {
    return recordService.populateUserRecords(records, categories, new Date(day))
  }

  const getCategoryClassname = (category: Category) => {
    return `
      week-calendar__category 
      ${category.events.length && `ibs-category-${category.code.toLowerCase()}-inverted`}
      ${styles.categoryLine}`
  }

  const handleChangeDay = (day: string) => {
    dispatch(setCurrentDay(day));
    recordService.updateRecordsForCurrentDay(records);
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