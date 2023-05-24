import {
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

import axios from "axios";
import { useEffect, useState } from "react";
import "./style.scss";
import React from "react";

const StaffPage = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          alignItems: "center",
          marginTop: "20%",
          height: "100%",
        }}
      >
        <div style={{ fontSize: "3rem" }}> WELCOME DOCTOR </div>
        <div style={{ fontSize: "2rem" }}> Navigate through menu </div>
      </div>
    </div>
  );
};
export default StaffPage;
