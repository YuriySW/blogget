export const debounceRaf = (fn) => {
  let raf = 0;
  return (...args) => {
    if (raf) return;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      fn(...args);
      raf = 0;
    });
  };
};
