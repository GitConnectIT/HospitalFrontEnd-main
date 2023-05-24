import { useSelector, useDispatch } from "react-redux";
// import SimpleBar from "simplebar-react";
import {
  Navbar,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
} from "reactstrap";
// import Notification from "./Notification";
import {
  ToggleMiniSidebar,
  ToggleMobileSidebar,
} from "../../../store/stores/customizer/customizer.store";
import ProfileDD from "./Profile";
import { RootState } from "../../../store/redux/rootState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";
import { AnimatePresence, motion } from "framer-motion";

// import {AnimatePresence, motion} from "../../../../../node_modules/framer-motion";

import useGetUser from "../../../hooks/useGetUser";
import { useState } from "react";
import AuthManager from "../../../utils/authManager";
const logo: string =
  require("../../../assets/images/landing-page/Official-Logo-Reverse.svg").default;
const logoIcon: string =
  require("../../../assets/images/logos/Logo-Icon.svg").default;

const userLogo = require("../../../assets/images/users/user4.jpg");

const Header = () => {
  const isDarkMode = useSelector((state: RootState) => state.customizer.isDark);
  /* eslint-disable */
  const [img, setImg] = useState(null);

  const topbarColor = useSelector(
    (state: RootState) => state.customizer.topbarBg
  );
  const isMiniSidebar = useSelector(
    (state: RootState) => state.customizer.isMiniSidebar
  );

  const dispatch = useDispatch();
  const user = useGetUser();

  const getImageUrl = (blob: any) => {
    if (blob) {
      return URL.createObjectURL(blob);
    }
    return userLogo;
  };
  // const getImage = async () => {
  //   if (user.profilePic) {
  //     const base64Img = await fetch(
  //       `data:image/jpeg;base64,${user.profilePic}`
  //     );
  //     const blobImage = await base64Img.blob();
  //     setImg(blobImage);
  //   }
  // };
  // useEffect(() => {
  //   if (!user) return;
  //   getImage();
  // }, [user]);
  return (
    <>
      <Navbar
        color={topbarColor}
        dark={!isDarkMode}
        light={isDarkMode}
        expand="lg"
        className="topbar"
      >
        {/********Logo*******/}
        <div className="d-none d-lg-flex align-items-center logo-space">
          <div className={`logo-container ${isMiniSidebar ? "exit" : ""}`}>
            <AnimatePresence>
              {isMiniSidebar ? (
                <motion.div
                  key={"logo-icon"}
                  className="position-absolute top-0 mt-3"
                  initial={{ opacity: 0, translateX: -50, position: "unset" }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ delay: 1 }}
                >
                  <img width={"31rem"} src={logoIcon} alt="Logo" />
                </motion.div>
              ) : (
                <motion.div
                  key={"logo"}
                  initial={{ translateX: -50, opacity: 0 }}
                  animate={{ translateX: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  exit={{ translateX: -50, opacity: 0 }}
                >
                  <img src={logo} alt="Logo" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* <Button
            close
            size="sm"
            className="ms-auto d-sm-block d-lg-none"
            onClick={() => dispatch(ToggleMobileSidebar())}
          /> */}
        </div>
        {/******************************/}
        {/**********Toggle Buttons**********/}
        {/******************************/}
        <div className="d-flex me-auto">
          <div>
            <Button
              color={topbarColor}
              className="d-none d-lg-block mx-1 bg-transparent border-0"
              onClick={() => {
                dispatch(ToggleMiniSidebar());
              }}
            >
              <FontAwesomeIcon icon={"fa-solid fa-bars" as any} size="lg" />
            </Button>
          </div>
          <NavbarBrand href="/" className="d-sm-block d-lg-none fw-bold fs-2">
            <img width={"31px"} src={logoIcon} alt="Logo-icon" />
          </NavbarBrand>
          <Button
            color={topbarColor}
            className="d-sm-block d-lg-none bg-transparent border-0 mx-1"
            onClick={() => dispatch(ToggleMobileSidebar())}
          >
            <FontAwesomeIcon icon={"fa-solid fa-bars" as any} size="lg" />
          </Button>
        </div>

        <div className="d-flex align-items-center">
          {/******************************/}
          {/**********Notification DD**********/}
          {/******************************/}
          {/* <UncontrolledDropdown className="mx-1">
            <DropdownToggle
              className="bg-transparent border-0"
              color={topbarColor}
            >
              <FontAwesomeIcon size="lg" icon={"fa-solid fa-message" as any} />
            </DropdownToggle>
            <DropdownMenu className="ddWidth">
              <DropdownItem header>
                <span className="mb-0 fs-5">Notifications</span>
              </DropdownItem>
              <DropdownItem divider />
              <SimpleBar style={{ maxHeight: "350px" }}>
                <Notification />
              </SimpleBar>
              <DropdownItem divider />
              <div className="p-2 px-3">
                <Button color="primary" size="sm" block>
                  Check All
                </Button>
              </div>
            </DropdownMenu>
          </UncontrolledDropdown> */}
          <UncontrolledDropdown>
            <DropdownToggle color="transparent">
              <img
                src={getImageUrl(img)}
                alt="profile"
                className="rounded-circle"
                width="30"
                height="30"
              />
            </DropdownToggle>
            <DropdownMenu className="ddWidth profile-dd">
              <ProfileDD />
              <div className="p-2 px-3">
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => {
                    AuthManager.logout(dispatch);
                  }}
                >
                  Logout
                </Button>
              </div>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
