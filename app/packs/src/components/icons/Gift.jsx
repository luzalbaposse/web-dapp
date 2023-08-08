import React from "react";
import Icon from "src/components/design_system/icon";

const Gift = props => (
  <Icon
    path="M12.5 9.5h-9V15a1 1 0 001 1h7a1 1 0 001-1V9.5zM13 6.5H3a.5.5 0 00-.5.5v2a.5.5 0 00.5.5h10a.5.5 0 00.5-.5V7a.5.5 0 00-.5-.5zM8 6.5V16M8 2V1M11.5 2.707L12.207 2M13.538 4.691l.924-.382M4.5 2.707L3.793 2M2.462 4.691l-.924-.382"
    {...props}
    color={props.color || "currentColor"}
  />
);

export default Gift;
