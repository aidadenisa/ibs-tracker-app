import { Category } from '../../types'
import CategorySection from '../events/CategorySection'
import Modal from '../general/Modal'
import recordService from '../../services/records'

interface AddNewRecordModalProps {
  categories: Category[]
  onClose: () => void,
}
const AddNewRecordModal = ({ categories, onClose }: AddNewRecordModalProps) => {
  const handleSaveRecords = async () => {
    await recordService.saveNewRecords();
    onClose();
  }

  return (
    <Modal
      title="Add new record"
      primaryBtnLabel="All done"
      hideHeader={true}
      onClose={onClose}
      onPrimary={handleSaveRecords}
    >
      <h2>What happened today?</h2>
      <div className="new-record__categories">
        {categories && categories.length &&
          categories.map(category => 
            <CategorySection category={category} key={category.id} />
          )
        }
      </div>
    </Modal>
  )
}

export default AddNewRecordModal;