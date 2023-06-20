import Modal from '../general/Modal'
interface AddNewRecordModalProps {
  onClose: () => void,
}
const AddNewRecordModal = ({ onClose }: AddNewRecordModalProps) => {
  return (
    <Modal
      title="Add new record"
      primaryBtnLabel="All done"
      onClose={onClose}
      onPrimary={onClose}
    >
      What happened today?
      <div className="new-record__categories">
        categorieessss
      </div>
    </Modal>
  )
}

export default AddNewRecordModal;