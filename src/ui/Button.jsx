import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "inline-block text-sm rounded-full bg-teal-500 font-semibold uppercase text-stone-800 transition-colors duration-300 hover:bg-teal-400 focus:bg-teal-400 focus:outline-none focus:ring focus:ring-teal-400 focus:ring-offset-2 disabled:cursor-wait ";
  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " px-4 text-xs py-2 md:px-5 md:py-2.5",
    secondary:
      "inline-block rounded-full border-2 border-stone-300 font-semibold uppercase text-stone-500 transition-colors hover:text-stone-800 duration-300 hover:bg-stone-300 focus:bg-stone-300 focus:outline-none focus:text-stone-800 focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-wait px-4 py-2.5 md:px-6 md:py-3.5",

    round: base + "px-2.5 text-sm py-1 md:px-5 md:py-2.5 ",
  };
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} className={styles[type]} disabled={disabled}>
        {children}
      </button>
    );

  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
