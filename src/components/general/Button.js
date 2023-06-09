const Button = ({ variant, label, onClick }) => {
  const variantClass = `ibs-btn ibs-btn-${variant}`;
  return (
    <button 
      className={variantClass}
      onClick={onClick}
    >{ label }</button>
  )
}

export default Button;