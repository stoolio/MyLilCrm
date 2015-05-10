import React, {PropTypes} from 'react';

import capitalize from 'lodash/string/capitalize';

import valid from '../../app/validation/diamonds';

let labelStyle = {
  position: 'relative',
  width: '100%'
};

const DiamondShape = React.createClass({
  propTypes: {
    shape: PropTypes.oneOf(valid.shape).isRequired,
    size: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    float: PropTypes.bool
  },
  render() {
    let {shape, size, float} = this.props;
    size = Number(size);
    let style = {
      height: (size + 20) || 'auto',
      width: size || 'auto'
    };
    if (float) style.float = 'left';
    return (
      <div style={style}>
        <img  src={`/public/img/diamonds/${shape}.png`}
              alt={`${shape} diamond`}
              className='img-thumbnail img-responsive' />
        <div style={labelStyle} className='text-center'>{capitalize(shape)}</div>
      </div>
    );
  }
});

export default DiamondShape;
