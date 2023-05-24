import { Container, Nav } from "reactstrap";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import NavSubItem from "./NavSubItem";
import NavSingleItem from "./NavSingleItem";
import { RootState } from "../../../../store/redux/rootState";
import ApplicationMenuController from "../../../../controllers/ApplicationMenuController";
import { useState, useEffect } from "react";
import IMenuResponse from "../../../../interfaces/controllers/IMenuResponse";
import axios from "axios";

const HorizontalSidebar = () => {
  const activeBg = useSelector(
    (state: RootState) => state.customizer.sidebarBg
  );
  const location = useLocation();
  const currentURL = location.pathname.split("/").slice(0, -1).join("/");
  const isFixed = useSelector(
    (state: RootState) => state.customizer.isSidebarFixed
  );

  const [menu, setMenu] = useState<IMenuResponse[]>([]);

  const fetchMenu = async () => {
    const menuData = await axios.get("ApplicationMenu/get-all");
    setMenu(menuData.data.data);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const isMobileSidebar = useSelector(
    (state: RootState) => state.customizer.isMobileSidebar
  );
  return (
    <div
      className={`horizontalNav shadow bg-${activeBg}  ${
        isFixed ? "fixedSidebar" : ""
      } ${isMobileSidebar ? "showSidebar" : ""}`}
      style={{ top: "34.5px" }}
    >
      <Container className="py-2">
        <Nav className={activeBg === "white" ? "" : "lightText"}>
          {menu.map((navi) => {
            if (navi.caption) {
              return (
                <div
                  className="navCaption fw-bold mt-2 d-none d-sm-block d-md-none"
                  key={navi.caption}
                >
                  {navi.caption}
                </div>
              );
            }
            if (navi.children) {
              return (
                <NavSubItem
                  key={navi.id}
                  icon={navi.icon}
                  title={navi.title}
                  items={navi.children}
                  suffix={
                    navi.children != null ? String(navi.children.length) : ""
                  }
                  activeBck={activeBg}
                  isUrl={currentURL === navi.route}
                />
              );
            }
            return (
              <NavSingleItem
                key={navi.id}
                className={location.pathname === navi.route ? "activeLink" : ""}
                route={navi.route}
                title={navi.title}
                icon={navi.icon}
              />
            );
          })}
        </Nav>
      </Container>
    </div>
  );
};

export default HorizontalSidebar;
