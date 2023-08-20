import { useSelector } from 'react-redux'
import { Category } from '@/types'
import { RootState } from '@/store'
import recordService from '@/features/records/services/records'
import Modal from '@/components/Modal'
import CategorySection from '@/features/records/components/CategorySection'
import EventsList from '@/features/records/components/EventsList'

interface AddNewRecordModalProps {
  categories: Category[]
  onClose: () => void,
}
const AddNewRecordModal = ({ categories, onClose }: AddNewRecordModalProps) => {

  const selectedEventsIds = useSelector((state: RootState) => state.selectedEventsIds);

  const handleSaveRecords = async () => {
    const result = await recordService.saveNewRecords();
    if(result && result.status === 200) {
      await recordService.refreshRecords();
    }
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