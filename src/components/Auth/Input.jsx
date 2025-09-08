import style from './Auth.module.css';

export const Input = (props) => {
  const { error, name, label } = props;

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input {...props} />
      {error && <span className={style.error}>{error}</span>}
    </div>
  );
};
