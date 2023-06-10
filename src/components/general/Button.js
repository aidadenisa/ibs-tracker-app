const Button = ({ variant, label, disabled, onClick }) => {
  const variantClass = `ibs-btn ibs-btn-${variant}`;
  return (
    <button 
      className={variantClass}
      disabled={disabled}
      onClick={onClick}
    >{ label }</button>
  )
}

export default Button;