import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import {
  PopoverHeader,
  Popover as ReactstrapPopover,
  PopoverBody,
  Col,
} from "reactstrap";
import PropertyManager from "../../utils/propertyManager";
import "./style.scss";
export declare const top: "top";
export declare const bottom: "bottom";
export declare const right: "right";
export declare const left: "left";
export declare const auto: "auto";
export declare type VariationPlacement =
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "right-start"
  | "right-end"
  | "left-start"
  | "left-end";
export declare type AutoPlacement = "auto" | "auto-start" | "auto-end";

export declare type BasePlacement =
  | typeof top
  | typeof bottom
  | typeof right
  | typeof left;
interface IPopover {
  title: any;
  isPopoverOpen: boolean;
  popoverRef: any;
  target: string;
  setIsPopoverOpen: (value: boolean) => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  placement?: VariationPlacement | AutoPlacement | BasePlacement;
}
const Popover = (props: IPopover) => {
  const {
    isPopoverOpen,
    setIsPopoverOpen,
    title,
    children,
    actions,
    popoverRef,
    target,
    placement,
    className,
  } = props;
  const popoverBody = useRef(null);
  const position = PropertyManager.getValueOrDefault(placement, "bottom");

  useEffect(() => {
    document.addEventListener("click", handleBodyClick);
    return () => {
      document.removeEventListener("click", handleBodyClick);
    };
  }, [isPopoverOpen]);
  const handleBodyClick = (e: MouseEvent) => {
    let buttonClick = popoverRef?.current?.contains(e.target);
    let bodyClick = popoverBody?.current?.contains(e.target);
    if (bodyClick) {
      return;
    }
    if (buttonClick) {
      setIsPopoverOpen(!isPopoverOpen);
    } else {
      setIsPopoverOpen(false);
    }
  };
  const handleClosePopover = () => {
    setIsPopoverOpen(false);
  };
  return (
    <ReactstrapPopover
      innerRef={popoverBody}
      isOpen={isPopoverOpen}
      placement={position}
      target={target}
      hideArrow
      className={className}
    >
      <PopoverHeader className="border-bottom border-2 border-primary">
        <Col className="text-center">
          {title}
          <FontAwesomeIcon
            className="close-icon position-absolute"
            style={{ right: "1rem" }}
            onClick={handleClosePopover}
            icon={"fa-solid fa-x" as any}
          />
        </Col>
      </PopoverHeader>
      <PopoverBody>{children}</PopoverBody>
      <div className="popover-footer">{actions}</div>
    </ReactstrapPopover>
  );
};
export default Popover;
