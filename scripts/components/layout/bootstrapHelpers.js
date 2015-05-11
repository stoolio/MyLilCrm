import curry from '../../lib/curry';

let sizePrefixes = {
  xsmall: 'xs',
  small: 'sm',
  medium: 'md',
  large: 'lg'
};

let sizes = Object.keys(sizePrefixes);

function prefix(type, prefix) {
  if (!prefix || prefix.length === 0) return '';
  if (type.substr(0, 3) === 'btn' && prefix === 'default') return '';
  return `${pre}-${prefix}`;
}

function createPrefixer(type) {
  return curry(prefix, [type]);
}

function sizePrefix (pre, size) {
  return prefix(pre, sizePrefixes[size]);
}

function bootstrap (type, size = false, ...context) {
  let classes = [
    type,
    sizePrefix(type, size)
  ];
  classes.concat(context.map(thing => {
    return prefix(type, thing);
  }))
  return classes.join(' ');
}

function column (cols, offset, join = true) {
  Object.keys(cols)
    .map(c => {
      return `col-${sizePrefix(c)}-${cols[c]}`;
    })
    .concat(
      Object.keys(offset)
        .map(o => {
          return `col-${sizePrefix(o)}-offset-${offset[o]}`;
        })
    );
}

export {bootstrap, column, sizePrefix, prefix, sizes};
