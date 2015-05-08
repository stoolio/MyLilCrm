// throttles fn calling only once per delay
// more importantly, it calls fn with the
// last passed arg
function throttle(fn, delay) {
  let queued = false,
      current;
  return val => {
    current = val;
    if(queued) return;
    queued = true;
    setTimeout(() => {
      queued = false;
      fn(current);
    }, delay);
  }
}

export default throttle;
