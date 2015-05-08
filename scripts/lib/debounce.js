let now = window && window.performance && window.performance.now.bind(window.performance) || Date.now;

function debounce (fn, delay, max, leading) {
  let timeout,
      lastCalled,
      current,
      start = false;
  leading = leading === true ? leading : false;
  if (max === undefined) max = false;
  if (max === true) max = delay;
  function callFn () {
    fn(current);
    start = false;
    timeout = void 0;
  }
  return val => {
    if (!start) {
      if (leading) callFn();
      start = now();
    }
    current = val;
    lastCalled = now();
    clearTimeout(timeout);
    if (max && (lastCalled - start) >= max) {
      callFn();
    } else {
      timeout = setTimeout(callFn, delay);
    }
  }
}

export default debounce;
