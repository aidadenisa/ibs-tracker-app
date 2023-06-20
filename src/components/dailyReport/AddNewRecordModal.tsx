import { Category } from '../../types'
import CategorySection from '../events/CategorySection'
import Modal from '../general/Modal'
interface AddNewRecordModalProps {
  categories: Category[]
  onClose: () => void,
}
const AddNewRecordModal = ({ categories, onClose }: AddNewRecordModalProps) => {
  
  return (
    <Modal
      title="Add new record"
      primaryBtnLabel="All done"
      onClose={onClose}
      onPrimary={onClose}
    >
      What happened today?
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