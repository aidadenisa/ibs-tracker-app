import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { usePopulateUserRecords } from "../../hooks/records";
import CategorySection from "../events/CategorySection";
import EventsList from "../events/EventsList";

interface RecordsListProps {
  date: Date
}

const RecordsList = ({ date }: RecordsListProps) => {

  const user = useSelector((state: RootState) => state.user);
  const categories = useSelector((state: RootState) => state.categories);

  const categorizedRecords = usePopulateUserRecords(user, categories, date);

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