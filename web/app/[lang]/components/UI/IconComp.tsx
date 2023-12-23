import React, { FunctionComponent, SVGProps } from "react";
import { getIcon } from "../../../../utils/icons";

type IconComponentProps = SVGProps<SVGSVGElement> & {
  name: string;
};

const IconComponent: FunctionComponent<IconComponentProps> = ({
  name,
  ...rest
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...rest}>
      {getIcon(name)}
    </svg>
  );
};

export default IconComponent;
