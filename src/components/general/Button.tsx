interface ButtonProps {
  variant: 'primary' | 'secondary' | 'accent' | 'clear',
  label: string,
  disabled?: boolean,
  onClick?: () => void,
}

const Button = ({ variant, label, disabled, onClick }: ButtonProps) => {
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