const Input = ({ type, placeholder, value, onChange }) => {

  return (
    <input 
      className="ibs-input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}/>
  )
}

export default Input;