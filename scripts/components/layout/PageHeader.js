import React, {PropTypes} from 'react';
import 'react/addons';

const PageHeader = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  propTypes: {
    title: PropTypes.string.isRequired,
    sub: PropTypes.string
  },
  getDefaultProps() {
    return {
      sub: ''
    };
  },
  render() {
    let header = this.props.sub === '' ?
      <h1>{this.props.title}</h1> :
      (
        <h1>
          {this.props.title + ' '}<small>{this.props.sub}</small>
        </h1>
      );
    return (
      <div className='page-header'>
        <div className='row'>
          <div className='col-md-6'>
            {header}
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default PageHeader;
