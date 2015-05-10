function getPath(obj, path) {
  if(path.indexOf('.') === -1) {
    return obj[path];
  } else {
    let keys = path.split('.'),
        len = keys.length - 1,
        cursor = obj,
        i = -1;
    while(++i < len) {
      cursor = cursor[keys[i]];
    }
    return cursor[keys[i]];
  }
}

export default getPath;
