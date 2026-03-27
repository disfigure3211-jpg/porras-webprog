import { Link } from 'react-router-dom';

const variantClasses = {
  primary: 'bg-cyan-700 text-white hover:bg-cyan-600 rounded-full shadow-md',
  secondary: 'bg-slate-900 text-cyan-100 hover:bg-slate-800 border border-cyan-700 rounded-lg',
};

const Button = ({
  children,
  to,
  type = 'button',
  variant = 'secondary',
  className = '',
}) => {
  const classes = [
    'inline-flex items-center justify-center px-4 py-2 text-xs font-bold uppercase tracking-wider transition duration-300',
    variantClasses[variant] ?? variantClasses.secondary,
    className,
  ]
    .join(' ')
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
};

export default Button;