import { HTMLInputTypeAttribute, ReactNode } from 'react';

interface InputProps {
  id?: string,
  type?: HTMLInputTypeAttribute,
  placeholder?: string, 
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  children?: ReactNode,
}
const Input = ({ id, type, placeholder, value, onChange, children }: InputProps) => {
  
  return (
    <div>
      {children}
      <input
        id={id}
        className="ibs-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange} />
    </div>
  )
}

export default Input;

/**
 * Before switching to typescript, this is how we set the prop types.
 * Leaving it here as example.
 * 
 * import PropTypes from 'prop-types';
 *  Input.propTypes = {
 *  type: PropTypes.string,
 *  placeholder: PropTypes.string,
 *  onChange: PropTypes.func.isRequired
 * }

 */

