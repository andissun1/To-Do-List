import style from './Auth.module.css';

export const Input = ({ label, name, error, value, ...props }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input name={name} value={value} {...props} />
      {error && <span className={style.error}>{error}</span>}
    </div>
  );
};
