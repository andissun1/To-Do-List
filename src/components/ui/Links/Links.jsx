import { Icon } from '../Icons/Icon';
import style from './Links.module.css';

export const Links = ({ links, children, onClick }) => {
  if (!links) return;

  return Object.entries(links).map(([key, value]) => {
    let hostname = new URL(value).hostname;
    const size = '64';

    let fileName = false;
    if (value.includes('firebasestorage.googleapis.com')) {
      hostname = 'firebase.google.com';
      fileName = key.replaceAll('?', ' ');
    }

    return (
      <a
        key={key}
        href={onClick ? null : value}
        target="blank"
        className={style.links}
        onClick={(e) => onClick && onClick(key)}
      >
        {fileName ? (
          <Icon name={'download'} />
        ) : (
          <img
            height="16px"
            width="16px"
            src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=${size}`}
          />
        )}
        {fileName || hostname}
        {children}
      </a>
    );
  });
};
