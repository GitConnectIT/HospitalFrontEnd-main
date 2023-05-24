import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Row,
  Col,
  Card as CardStrap,
  TabContent,
  Nav,
  NavItem,
  NavLink,
  TabPane,
} from "reactstrap";

import EntireProfileView from "./EntireProfileView";
import EditProfile from "./EditProfile";
import CardProfile from "./CardProfile";
import { useNavigate, useParams } from "react-router-dom";
import useGetUser from "../../../hooks/useGetUser";
import axios from "axios";

const Profile = () => {
  const { tabId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const user = useGetUser();

  const getViewProfileData = async () => {
    const response = await axios.get("user").then((x) => x.data);
    setUserData(response);
  };

  useEffect(() => {
    // getExistingImage();
    getViewProfileData();
  }, []);

  const toggle = (tab: any) => {
    navigate(`/${user.role.toLowerCase()}/profile/${tab}`);
  };

  return (
    userData && (
      <>
        <Row className="pt-5">
          <Col xs="12" md="12" lg="6" xl="4">
            <CardProfile userData={userData}></CardProfile>
          </Col>
          <Col xs="12" md="12" lg="6" xl="8">
            <CardStrap>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={
                      tabId === "view"
                        ? "active bg-transparent"
                        : "cursor-pointer"
                    }
                    onClick={() => {
                      toggle("view");
                    }}
                  >
                    Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={
                      tabId === "edit"
                        ? "active bg-transparent"
                        : "cursor-pointer"
                    }
                    onClick={() => {
                      toggle("edit");
                    }}
                  >
                    <FontAwesomeIcon
                      icon={"fa-solid fa-user-pen" as any}
                      size="lg"
                    />
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={tabId}>
                <TabPane tabId="view">
                  <EntireProfileView userData={userData} />
                </TabPane>
                <TabPane tabId="edit">
                  <EditProfile
                    onSubmit={() => getViewProfileData()}
                    userData={userData}
                  />
                </TabPane>
              </TabContent>
            </CardStrap>
          </Col>
        </Row>
      </>
    )
  );
};

export default Profile;
