export default function Button({ 
  children, 
  variant = 'default', 
  className = '', 
  style = {},
  ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';
  
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    ghost: 'hover:bg-accent hover:text-accent-foreground'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}