import { useRef } from 'react';

// Кастомный хук для поисковика
export function useDebounce(func, delay = 300) {
  const ref = useRef(null);

  return (...args) => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => func(...args), delay);
  };
}

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

// Валидатор
const mainRules = {
  required: (value) => {
    return Boolean(value.trim());
  },
  min: (value, min) => {
    return value.length >= min;
  },
  max: (value, max) => {
    return value.length <= max;
  },
  isEmail: (value) => {
    return /^\S+@\S+\.\S+$/.test(value);
  },
};

export const validator = (inputsData, scheme) => {
  const error = {};

  for (const name in inputsData) {
    const inputNameRules = scheme[name];
    for (const rule in inputNameRules) {
      const { message, value } = inputNameRules[rule];
      const validate = mainRules[rule];

      const hasError = validate && !validate(inputsData[name], value);

      if (hasError) {
        error[name] = message;
        break;
      }
    }
  }

  return error;
};
