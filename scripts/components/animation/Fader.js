import React, {PropTypes} from 'react';

let styles = {
  opacity: 0
};

const Fader = React.createClass({
  propTypes: {
    visible: PropTypes.bool,
    duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    easing: PropType.string
  },
  getDefaultProps() {
    return {
      visible: false,
      duration: 1,
      easing: 'linear'
    };
  },
  componentDidMount() {
    let {style} = React.FindDOMNode(this),
        {duration, easing} = this.props;
    style.transition = `opacity ${Number(this.props.duration)}s ${easing}`;
    style.opacity = 1;

    setTimeout(() => {
      style.removeProperty('transition');
      styles.opacity = 1;
    }, duration + 50);
  },
  render() {
    return (
      <div {...this.props} style={styles} />
    );
  }

});

export default Fader;
