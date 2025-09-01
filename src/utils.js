export function debounce(func, timeout = 300) {
  let timer;
  return (args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(args);
    }, timeout);
  };
}

export const createLinks = (text) => {
  const links = text.match(
    /(?:https?:\/\/)?(?:www\.)?(?:[\da-z-]+\.)+[a-z]{2,10}(?:\/[^\s/]+)*\/?/gi
  );
  const newTitle = text.replace(
    /(?:https?:\/\/)?(?:www\.)?(?:[\da-z-]+\.)+[a-z]{2,10}(?:\/[^\s/]+)*\/?/gi,
    ' '
  );

  console.log('Ссылки:', links, 'Новый текст:', newTitle);

  return { links, newTitle };
};
