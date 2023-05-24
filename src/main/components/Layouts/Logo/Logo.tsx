import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { ReactComponent as LogoDarkIcon } from "../../../assets/images/logos/dark-logo-icon.svg";
// import { ReactComponent as LogoDarkText } from "../../../assets/images/logos/dark-logo-text.svg";
// import { ReactComponent as LogoWhiteIcon } from "../../../assets/images/logos/white-logo-icon.svg";
// import { ReactComponent as LogoWhiteText } from "../../../assets/images/logos/white-logo-text.svg";
import { RootState } from "../../../store/redux/rootState";

const LogoDarkIcon = require("../../../assets/images/logos/dark-logo-icon.svg");

const LogoDarkText = require("../../../assets/images/logos/dark-logo-text.svg");

const LogoWhiteIcon = require("../../../assets/images/logos/white-logo-icon.svg");

const LogoWhiteText = require("../../../assets/images/logos/white-logo-text.svg");

const Logo = () => {
  const isDarkMode = useSelector((state: RootState) => state.customizer.isDark);
  const toggleMiniSidebar = useSelector(
    (state: RootState) => state.customizer.isMiniSidebar
  );
  const activeTopbarBg = useSelector(
    (state: RootState) => state.customizer.topbarBg
  );
  return (
    <Link to="/" className="d-flex align-items-center gap-2">
      {isDarkMode || activeTopbarBg !== "white" ? (
        <>
          <img src={LogoWhiteIcon} alt="" />
          {/* <LogoWhiteIcon /> */}
          {toggleMiniSidebar ? "" : <img src={LogoWhiteText} />}
        </>
      ) : (
        <>
          <img src={LogoDarkIcon} alt="" />
          {toggleMiniSidebar ? "" : <img src={LogoDarkText} alt="" />}
        </>
      )}
    </Link>
  );
};

export default Logo;
