export function debounce(func, timeout = 300) {
  let timer;
  return (args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(args);
    }, timeout);
  };
}
