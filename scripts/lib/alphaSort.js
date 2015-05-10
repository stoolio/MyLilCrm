import getPath from './getPath';

let alphaSort = function(by, dir) {
  return (a, b) => {
    a = getPath(a, by);
    b = getPath(b, by);
    if(a < b) return -1 * dir;
    if(a > b) return 1 * dir;
    return 0;
  };
};

export default alphaSort;
