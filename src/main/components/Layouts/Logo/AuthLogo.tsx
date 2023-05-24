import React from "react";
import { useSelector } from "react-redux";

// import { ReactComponent as LogoDarkIcon } from "../../assets/images/logos/dark-logo-icon.svg";
// import { ReactComponent as LogoDarkText } from "../../assets/images/logos/dark-logo-text.svg";
// import { ReactComponent as LogoWhiteIcon } from "../../assets/images/logos/white-logo-icon.svg";
// import { ReactComponent as LogoWhiteText } from "../../assets/images/logos/white-logo-text.svg";

const LogoDarkIcon = require("../../../assets/images/logos/dark-logo-icon.svg");

const LogoDarkText = require("../../../assets/images/logos/dark-logo-text.svg");

const LogoWhiteIcon = require("../../../assets/images/logos/white-logo-icon.svg");

const LogoWhiteText = require("../../../assets/images/logos/white-logo-text.svg");
const AuthLogo = () => {
  const isDarkMode = useSelector((state: any) => state.customizer.isDark);

  return (
    <div className="p-4 d-flex justify-content-center gap-2">
      {isDarkMode !== false ? (
        <>
          <img src={LogoWhiteIcon} alt="" />
          <img src={LogoWhiteText} alt="" />
        </>
      ) : (
        <>
          <img src={LogoDarkIcon} alt="" />
          <img src={LogoDarkText} alt="" />
        </>
      )}
    </div>
  );
};

export default AuthLogo;
