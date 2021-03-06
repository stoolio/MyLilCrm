import partial from '../../lib/partial';

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
  return `${type}-${prefix}`;
}

function createPrefixer(type) {
  return partial(prefix, type);
}

function sizePrefix (type, size) {
  return prefix(type, sizePrefixes[size]);
}

function bootstrap (type, size = false, ...context) {
  let classes = [
    type,
    sizePrefix(type, size)
  ];
  return classes.concat(context.map(thing => {
    return prefix(type, thing);
  })).join(' ');
}

function column (cols, offset = {}) {
  return Object.keys(cols)
    .map(c => {
      return `${sizePrefix('col', c)}-${cols[c]}`; //`col-${sizePrefix(c)}-${cols[c]}`;
    })
    .concat(
      Object.keys(offset)
        .map(o => {
          return `${sizePrefix('col', o)}-offset-${cols[o]}`; //`col-${sizePrefix(o)}-offset-${offset[o]}`;
        })
    ).join(' ');
}

window.bootstrap = bootstrap;

export {bootstrap, column, sizePrefix, prefix, sizes};
