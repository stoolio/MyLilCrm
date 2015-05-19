export default function pick(obj, props) {
  let ret = {};

  for (let prop of props) {
    ret[prop] = obj[prop];
  }

  return ret;
}
