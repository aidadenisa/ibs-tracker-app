import { ReactNode } from 'react';
import Button from './Button';

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
        <div className="modal__title">
          {title}
        </div>
        <Button
          className="modal__close-btn"
          variant="clear"
          label="x"
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