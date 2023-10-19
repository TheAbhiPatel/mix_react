const debounce = (cb: any, delay: number) => {
  let timer: number;

  return function (...agrs: any) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(agrs);
    }, delay);
  };
};

export default debounce;
