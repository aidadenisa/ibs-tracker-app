import { ReactNode } from 'react';
import Button from '@/components/general/Button';
import { X } from 'phosphor-react';
interface ModalProps {
  // show: boolean,
  title: string,
  primaryBtnLabel: string,
  secondaryBtnLabel?: string,
  children: ReactNode,
  onClose?: () => void,
  onPrimary?: () => void,
  onSecondary?: () => void,
}

const Modal = ({ title, primaryBtnLabel, secondaryBtnLabel, children, onPrimary, onClose, onSecondary }: ModalProps) => {

  return (
    <div className={`modal`}>
      <div className="modal__header">
        <h2 className="modal__title">{title}</h2>
        <X className="modal__close-btn"
          color="var(--ibs-color-gray)"
          size="24px"
          onClick={onClose}
        />
      </div>

      <div className="modal__body">
        {children}
      </div>
      <div className="modal__action-bar">
        {
          primaryBtnLabel && <Button
            variant="primary"
            label={primaryBtnLabel}
            onClick={onPrimary}
          />
        }
        {
          secondaryBtnLabel && <Button
            variant="secondary"
            label={secondaryBtnLabel}
            onClick={onSecondary}
          />
        }
      </div>
    </div>
  )
}

export default Modal;