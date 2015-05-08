function curry(fn, curried, context) {
  context = context || void 0;
  return (args) => {
    fn.apply(context, curried.concat(args));
  }
}

export default curry:
