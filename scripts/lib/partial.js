let partial = (fn, ...x) =>
  (...y) =>
    fn(...x.concat(y));

export default partial;
