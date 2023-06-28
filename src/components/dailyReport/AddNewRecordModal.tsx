import { Category } from '../../types'
import CategorySection from '../events/CategorySection'
import Modal from '../general/Modal'
import recordService from '../../services/records'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import EventsList from '../events/EventsList'

interface AddNewRecordModalProps {
  categories: Category[]
  onClose: () => void,
}
const AddNewRecordModal = ({ categories, onClose }: AddNewRecordModalProps) => {

  const selectedEventsIds = useSelector((state: RootState) => state.selectedEventsIds);

  const handleSaveRecords = async () => {
    await recordService.saveNewRecords();
    onClose();
  }

  return (
    <Modal
      title="What happened today?"
      primaryBtnLabel="All done"
      onClose={handleSaveRecords}
      onPrimary={handleSaveRecords}
    >
      <div className="new-record__categories">
        {categories && categories.length &&
          categories.map(category =>
            <CategorySection category={category} key={category.id}>
              {
                category.events && category.events.length
                && <EventsList
                  events={category.events}
                  canInteract={true}
                  selectedEventsIds={selectedEventsIds}
                />
              }
            </CategorySection>
          )
        }
      </div>
    </Modal>
  )
}

export default AddNewRecordModal;