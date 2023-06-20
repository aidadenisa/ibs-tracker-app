import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

import DateHeader from '../../components/dailyReport/DateHeader';
import WeekCalendar from '../../components/dailyReport/WeekCalendar';
import DailyActionBar from '../../components/dailyReport/DailyActionBar';
import AddNewRecordModal from '../../components/dailyReport/AddNewRecordModal';

import { getWeekDaysByDate } from '../../services/utils';
import categoryService from '../../services/categories';

import styles from './DayReport.module.css';
import { setCategories } from '../../reducers/categories';

const DayReport = () => {

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  const categories = useSelector((state:RootState) => state.categories);

  const [currentDay, setCurrentDay] = useState<Date>(new Date());
  const [days, setDays] = useState<string[]>(getWeekDaysByDate(new Date()));
  const [showAddNewRecordModal, setShowAddNewRecordModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      if(!categories || (categories && !categories.length)) {
        const categories = await categoryService.getCategoriesWithEvents();
        dispatch(setCategories(categories));
      }
    }
    fetchCategories();
  }, []);

  const handleAddRecordClick = () => {
    setShowAddNewRecordModal(true);
    console.log('set to true')
  }
  const handleCloseModalClick = () => {
    setShowAddNewRecordModal(false);
  }
  return (
    <div className={`day-report ${styles.dayReport}`}>
      {showAddNewRecordModal &&
        <AddNewRecordModal
          categories={categories}
          onClose={handleCloseModalClick}
        />
      }
      <DateHeader date={currentDay.toISOString()} />
      <WeekCalendar days={days} />
      <DailyActionBar onAddRecord={handleAddRecordClick} />
    </div>
  )
}

export default DayReport;