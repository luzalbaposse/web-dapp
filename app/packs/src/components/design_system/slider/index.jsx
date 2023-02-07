import React from "react";
import { func, bool } from "prop-types";
import cx from "classnames";

const Slider = ({ onChange, checked, disabled, className }) => {
  return (
    <label className={cx("form-switch", className)}>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} />
      <i />
    </label>
  );
};

Slider.defaultProps = {
  checked: false
};

Slider.propTypes = {
  onChange: func.isRequired,
  checked: bool
};

export default Slider;
