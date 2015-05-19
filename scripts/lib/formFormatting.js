// hey, I should write tests for these
// especially becase I'm not sure if they work
const phoneNum = {
  from: num => num.replace(/^\((\d{1,3})\)\s(\d{1,3})?-(\d{1,4})?/, '$1$2$3').trim(),
  to: num => num.replace(/^(\d{1,3})(\d{1,3})?(\d{1,4})?/, '($1) $2-$3')
}

export default {
  phoneNum
};
