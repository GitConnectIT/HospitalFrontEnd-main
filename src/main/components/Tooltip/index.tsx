import React from "react";
import { Tooltip as TooltipRStrap } from "reactstrap";
import { useState } from "react";
import PropertyManager from "../../utils/propertyManager";
interface Props {
  children: any;
  target?: string;
  placement?: string;
}

const Tooltip = ({ children, target, placement }: Props) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const getValueOrDef = PropertyManager.getValueOrDefault(placement, "top");
  return (
    <TooltipRStrap
      placement={getValueOrDef as any}
      isOpen={tooltipOpen}
      target={target}
      autohide={false}
      toggle={() => setTooltipOpen(!tooltipOpen)}
    >
      {children}
    </TooltipRStrap>
  );
};

export default Tooltip;
