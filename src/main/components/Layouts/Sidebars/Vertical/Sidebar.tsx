import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  UncontrolledDropdown,
} from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SimpleBar from "simplebar-react";
import NavItemContainer from "./NavItemContainer";
import NavSubMenu from "./NavSubMenu";
import { useEffect, useState } from "react";
import ApplicationMenuController from "../../../../controllers/ApplicationMenuController";
import IMenuResponse from "../../../../interfaces/controllers/IMenuResponse";
import "./style.scss";
import useGetUser from "../../../../hooks/useGetUser";
import stringManager from "../../../../utils/stringManager";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthManager from "../../../../utils/authManager";
import axios from "axios";

const user1: string = require("../../../../..//main/assets/images/users/user4.jpg");

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentURL = location.pathname.split("/").slice(0, -1).join("/");
  const [expandedMenuItem, setExpandedMenuItem] = React.useState<number>(null);
  /* eslint-disable */
  const [img, setImg] = useState(null);
  const [menu, setMenu] = useState<IMenuResponse[]>([]);
  const user = useGetUser();

  const getImageUrl = (blob: any) => {
    if (blob) {
      return URL.createObjectURL(blob);
    }
    return user1;
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

  const fetchMenu = async () => {
    const menuData = await axios.get("ApplicationMenu/get-all");
    setMenu(menuData.data.data);
  };

  useEffect(() => {
    fetchMenu();
  }, []);


  const activeBg = useSelector((state: any) => state.customizer.sidebarBg);
  const isFixed = useSelector((state: any) => state.customizer.isSidebarFixed);
  if (menu.length === 0) return;
  else
    return (
      <div
        className={`sidebarBox sidebar-width shadow bg-${activeBg} ${
          isFixed ? "fixedSidebar" : ""
        }`}
      >
        <SimpleBar style={{ height: "100%" }}>
          <div className="profilebg">
            <div className="p-3 d-flex ">
              <img
                src={getImageUrl(img)}
                alt="user"
                width="50"
                height="50"
                className="rounded-circle mx-auto"
              />
            </div>
            <div className="d-flex gap-2 text-center align-items-center text-dark-white p-1 justify-content-center flex-wrap background-transparent">
              <span>
                {`${stringManager.CapitalizeFirstLetter(
                  user?.firstName
                )} ${stringManager.CapitalizeFirstLetter(user?.lastName)}`}
              </span>
              {isFixed && (
                <UncontrolledDropdown>
                  <DropdownToggle className="bg-transparent border-0">
                    <FontAwesomeIcon
                      className="cursor-pointer"
                      size="lg"
                      icon={"fa-solid fa-angle-down" as any}
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      onClick={() => {navigate(`/${user.role}/profile`);}}
                      className="px-4 py-3"
                    >
                      <FontAwesomeIcon
                        icon={"fa-solid fa-user" as any}
                        size="lg"
                      />
                      &nbsp;{" "}
                     My Profile
                    </DropdownItem>
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
              )}
            </div>
          </div>

          <div className="p-3 pt-1 mt-2 ">
            <Nav
              vertical
              className={`submenu-width ${
                activeBg === "white" ? "" : "lightText"
              }`}
            >
              {menu.map((navi: any) => {
                if (navi.caption) {
                  return (
                    <div
                      className="navCaption text-uppercase mt-4"
                      key={navi.id}
                    >
                      {navi.caption}
                    </div>
                  );
                }
                if (navi.children) {
                  return (
                    <NavSubMenu
                      expand={expandedMenuItem === navi.id}
                      id={navi.id}
                      setExpand={(id) => setExpandedMenuItem(id)}
                      key={navi.id}
                      icon={navi.icon}
                      title={navi.title}
                      items={navi.children}
                      suffix={navi.suffix}
                      suffixColor={navi.suffixColor}
                      isUrl={currentURL === navi.route}
                    />
                  );
                }
                return (
                  <NavItemContainer
                    key={navi.id}
                    className={
                      location.pathname === navi.route ? "activeLink" : ""
                    }
                    to={navi.route}
                    title={navi.title}
                    suffix={navi.suffix}
                    suffixColor={navi.suffixColor}
                    icon={navi.icon}
                    onClick={() => setExpandedMenuItem(null)}
                  />
                );
              })}
            </Nav>
          </div>
        </SimpleBar>
      </div>
    );
};

export default Sidebar;
