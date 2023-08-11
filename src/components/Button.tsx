interface ButtonProps {
  variant: 'primary' | 'secondary' | 'accent' | 'clear',
  label: string,
  className?: string,
  disabled?: boolean,
  onClick?: () => void,
}

const Button = ({ className, variant, label, disabled, onClick }: ButtonProps) => {
  const buttonClasses = `ibs-btn ibs-btn-${variant} ${className}`;
  return (
    <button 
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
    >{ label }</button>
  )
}

export default Button;