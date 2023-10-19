const throttle = (cb: any, delay: number) => {
  let last = 0;
  return (...args: any) => {
    let now = Date.now();
    if (now - last < delay) return;
    last = now;
    return cb(args);
  };
};

export default throttle;
