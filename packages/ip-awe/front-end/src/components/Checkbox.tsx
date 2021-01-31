import React from "react";

interface Props {
  label: any;
  isSelected: any;
  onCheckboxChange: any;
}

const Checkbox = (props: Props) => (
  <div className="form-check">
    <label>
      <input
        type="checkbox"
        name={props.label}
        checked={props.isSelected}
        onChange={props.onCheckboxChange}
        className="form-check-input"
      />
      {props.label}
    </label>
  </div>
);

export default Checkbox;