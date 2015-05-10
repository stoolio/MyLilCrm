function findIndexById(obj, id) {
  let i = -1,
      len = obj.length;

  while(++i < len) {
    if(obj[i]._id === id) {
      return i;
    }
  }

  return false;
}

export default findIndexById;
