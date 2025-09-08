import style from './Links.module.css';

export const Links = ({ links, children, onClick }) => {
  if (!links) return;

  return Object.entries(links).map(([key, value]) => {
    const hostname = new URL(value).hostname;
    const size = '64';

    return (
      <a
        key={key}
        href={onClick ? null : value}
        target="blank"
        className={style.links}
        onClick={(e) => onClick && onClick(key)}
      >
        <img
          height="16px"
          width="16px"
          src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=${size}`}
        />
        {hostname}
        {children}
      </a>
    );
  });
};
