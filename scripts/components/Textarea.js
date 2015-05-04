import React from 'react';

const Textarea = React.createClass({
  propTypes: {
    value: React.PropTypes.any.isRequired,
    name: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    publishChange: React.PropTypes.func.isRequired
  },
  handleChange(e) {
    e.preventDefault()
    this.props.publishChange(e.target.value);
  },
  render() {
    let tag = 'input' + this.props.name;
    return (
      <div className='form-group'>
        <label htmlFor={tag} className='col-sm-2 control-label'>
          {this.props.name}
        </label>
        <div className='col-sm-10'>
          <textarea  value={this.props.value}
                  onChange={this.handleChange}
                  type={this.props.type}
                  placeholder={this.props.placeholder}
                  id={tag}
                  className='form-control' />
        </div>
      </div>
    );
  }

});

export default Textarea;
