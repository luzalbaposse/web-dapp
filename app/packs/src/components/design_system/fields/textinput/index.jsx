import React from "react";
import { P2, P3 } from "src/components/design_system/typography";

import cx from "classnames";

const TextInput = ({
  title,
  shortCaption,
  placeholder,
  disabled,
  value,
  onChange,
  onClick,
  onBlur,
  className,
  inputClassName,
  maxLength,
  required,
  error,
  id,
  ariaDescribedBy,
  topCaption,
  type = "text",
  maxLengthText = false
}) => {
  return (
    <div className={cx("d-flex flex-column", className)}>
      <div className="d-flex flex-row justify-content-between align-items-end">
        {title ? (
          <P2 bold className="text-primary-01 mb-2 d-flex flex-row justify-content-center align-items-center">
            {title} {required && <span className="text-danger">*</span>}
          </P2>
        ) : null}
        {maxLengthText ? <P2 className="mb-2" text={`${value.length}/${maxLength}`} /> : null}
        {topCaption ? <P3 className="mb-2" text={topCaption} /> : null}
      </div>

      <input
        id={id}
        type={type}
        className={cx("form-control", inputClassName, error && "border-danger")}
        aria-describedby={ariaDescribedBy}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onClick={onClick}
        onBlur={onBlur}
        maxLength={maxLength}
      />

      {shortCaption ? <p className="short-caption">{shortCaption}</p> : null}
    </div>
  );
};

export default TextInput;
