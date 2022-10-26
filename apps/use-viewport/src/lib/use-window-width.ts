import { startTransition, useEffect, useState } from 'react';

const useWindowWidth = (delay = 100) => {
  const [width, setWidth] = useState(getWidth());

  useEffect(() => {
    const onResize = debounce(() => {
      startTransition(() => {
        setWidth(getWidth());
      });
    }, delay);

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return width;
};

function getWidth() {
  return typeof window === 'undefined' ? 0 : window.innerWidth;
}

//TODO: replace to useDebounceCallback from use-debounce/lib (?)
function debounce<T extends Function>(fn: T, delay = 250) {
  let timeout = 0;

  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
}

export { useWindowWidth };
