import React from "react";
import { getIcon } from "../../utils/icons";

export default function IconComponent({ size, name, ...rest }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...rest}>
      {getIcon(name)}
    </svg>
  );
}
