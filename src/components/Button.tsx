interface ButtonProps {
  variant: 'primary' | 'secondary' | 'accent' | 'clear',
  label: string,
  className?: string,
  disabled?: boolean,
  size?: 'xs' | 'sm' | 'md' | 'lg',
  onClick?: () => void,
}

const Button = ({ className, variant, label, disabled, size, onClick }: ButtonProps) => {
  const buttonClasses = `ibs-btn 
    ${variant ? `ibs-btn-${variant}` : ''} 
    ${size ? `ibs-btn__size-${size}` : ''} 
    ${className ? className : ''}`;
  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
    >{label}</button>
  )
}

export default Button;