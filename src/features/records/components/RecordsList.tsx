import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import recordService from '@/features/records/services/records';
import CategorySection from '@/features/records/components/CategorySection';
import EventsList from '@/features/records/components/EventsList';

interface RecordsListProps {
  date: string
}

const RecordsList = ({ date }: RecordsListProps) => {

  const user = useSelector((state: RootState) => state.user);
  const categories = useSelector((state: RootState) => state.categories);

  const categorizedRecords = recordService.populateUserRecords(user, categories, new Date(date));

  return (
    <div className="ibs-records-list">
      {categorizedRecords && categorizedRecords.length &&
        categorizedRecords.map(category => (
          <div key={category.id}>
            {
              category.events && !!category.events.length &&
              <CategorySection category={category}>
                {
                  category.events && !!category.events.length
                  && <EventsList events={category.events} />
                }
              </CategorySection>
            }
          </div>
        ))
      }
    </div >
  )
}

export default RecordsList;