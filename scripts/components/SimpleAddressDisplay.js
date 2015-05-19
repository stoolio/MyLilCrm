// wraps the value so we can store the full verification object
// but display it pretty on one line
// ugh
function SimpleAddressDisplay(value) {
  return function (newVal) {
    if (newVal === undefined) {
      let _val = value();

      if (_val === '')
        return '';

      if (typeof _val === 'string')
        return _val;

      const {
        delivery_line_1,
        last_line
      } = _val;

      if (delivery_line_1 && last_line)
        return `${delivery_line_1} ${last_line}`;

      return '';
    }

    value(newVal);
  };
}

export default SimpleAddressDisplay;
