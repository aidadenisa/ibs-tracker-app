import PropTypes from 'prop-types';
const Input = ({ type, placeholder, value, onChange, children }) => {

  return (
    <div>
      {children}
      <input
        className="ibs-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange} />
    </div>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default Input;