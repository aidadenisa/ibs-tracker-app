import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';

import DateHeader from '@/features/weekCalendar/components/DateHeader';
import WeekCalendar from '@/features/weekCalendar/components/WeekCalendar';
import DailyActionBar from '@/features/records/components/DailyActionBar';
import AddNewRecordModal from '@/features/records/components/AddNewRecordModal';
import RecordsList from '@/features/records/components/RecordsList';

import categoryService from '@/features/records/services/categories';
import { setCategories } from '@/features/records/reducers/categories';

import styles from '@/features/dayReport/components/styles/DayReport.module.css';

const DayReport = () => {

  const dispatch = useDispatch();

  const categories = useSelector((state: RootState) => state.categories);
  const currentDay = useSelector((state: RootState) => state.currentDay);
  
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
      <DateHeader date={currentDay} />
      <WeekCalendar />
      <DailyActionBar onAddRecord={handleAddRecordClick} />
      <RecordsList date={currentDay} />
    </div>
  )
}

export default DayReport;