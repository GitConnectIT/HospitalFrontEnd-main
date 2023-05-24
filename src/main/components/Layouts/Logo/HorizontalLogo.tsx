import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import { RootState } from "../../../store/redux/rootState";
// import { ReactComponent as LogoDarkIcon } from "../../../assets/images/logos/dark-logo-icon.svg";
// import { ReactComponent as LogoDarkText } from "../../../assets/images/logos/dark-logo-text.svg";
// import { ReactComponent as LogoWhiteIcon } from "../../../assets/images/logos/white-logo-icon.svg";
// import { ReactComponent as LogoWhiteText } from "../../../assets/images/logos/white-logo-text.svg";

const LogoDarkIcon = require("../../../assets/images/logos/dark-logo-icon.svg");

const LogoDarkText = require("../../../assets/images/logos/dark-logo-text.svg");

const LogoWhiteIcon = require("../../../assets/images/logos/white-logo-icon.svg");

const LogoWhiteText = require("../../../assets/images/logos/white-logo-text.svg");

const HorizontalLogo = () => {
  const isDarkMode = useSelector((state: RootState) => state.customizer.isDark);
  const activetopbarBg = useSelector(
    (state: RootState) => state.customizer.topbarBg
  );
  return (
    <Link to="/" className="d-flex align-items-center gap-2">
      {isDarkMode || activetopbarBg !== "white" ? (
        <>
          <img src={LogoWhiteIcon} alt="" />
          <img src={LogoWhiteText} className="d-none d-lg-block" alt="" />
        </>
      ) : (
        <>
          <img src={LogoDarkIcon} alt="" />
          <img src={LogoDarkText} className="d-none d-lg-block" alt="" />
        </>
      )}
    </Link>
  );
};

export default HorizontalLogo;
