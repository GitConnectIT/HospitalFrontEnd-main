import {
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
  Container,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
// import SimpleBar from "simplebar-react";
// import Notification from "./Notification";
import Mega from "./Mega";
import { ToggleMobileSidebar } from "../../../store/stores/customizer/customizer.store";
import HorizontalLogo from "../Logo/HorizontalLogo";
import { RootState } from "../../../store/redux/rootState";
import Profile from "./Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthManager from "../../../utils/authManager";
const user1 = require("../../../assets/images/users/user4.jpg");
const HorizontalHeader = () => {
  const isDarkMode = useSelector((state: RootState) => state.customizer.isDark);
  const topbarColor = useSelector(
    (state: RootState) => state.customizer.topbarBg
  );
  const isMobileSidebar = useSelector(
    (state: RootState) => state.customizer.isMobileSidebar
  );
  const dispatch = useDispatch();

  return (
    <Navbar
      color={topbarColor}
      dark={!isDarkMode}
      light={isDarkMode}
      expand="lg"
      className="shadow HorizontalTopbar p-0"
    >
      <Container className="d-flex align-items-center">
        {/******************************/}
        {/**********Logo**********/}
        {/******************************/}
        <div className="pe-4 py-3 ">
          <HorizontalLogo />
        </div>
        {/******************************/}
        {/**********Toggle Buttons**********/}
        {/******************************/}

        <Nav className="me-auto flex-row" navbar>
          <Button
            color={topbarColor}
            className="d-sm-block d-lg-none"
            onClick={() => dispatch(ToggleMobileSidebar())}
          >
            <i className={`bi ${isMobileSidebar ? "bi-x" : "bi-list"}`} />
          </Button>

          {/******************************/}
          {/**********Mega DD**********/}
          {/******************************/}
          <UncontrolledDropdown className="mega-dropdown mx-1">
            <DropdownToggle
              className="bg-transparent border-0"
              color={topbarColor}
            >
              <FontAwesomeIcon icon={"fa-solid fa-grip" as any} size="lg" />
            </DropdownToggle>
            <DropdownMenu>
              <Mega />
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <div className="d-flex align-items-center">
          {/******************************/}
          {/**********Notification DD**********/}
          {/******************************/}
          {/* <UncontrolledDropdown>
            <DropdownToggle
              className="bg-transparent border-0"
              color={topbarColor}
            >
              <FontAwesomeIcon icon={"fa-regular fa-bell" as any} size="lg" />
            </DropdownToggle>
            <DropdownMenu className="ddWidth" end>
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

          {/******************************/}
          {/**********Profile DD**********/}
          {/******************************/}
          <UncontrolledDropdown>
            <DropdownToggle tag="span" className="p-2 cursor-pointer ">
              <img
                src={user1}
                alt="profile"
                className="rounded-circle"
                width="30"
              />
            </DropdownToggle>
            <DropdownMenu className="ddWidth">
              <Profile />

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
      </Container>
    </Navbar>
  );
};

export default HorizontalHeader;
