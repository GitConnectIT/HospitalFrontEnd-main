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

const ManagerPage = () => {
  const [people, setPeople] = useState<any>(0);

  const fetchNumberOfPeopleServer = async () => {
    const res: any = await (await axios.get("reservation/done")).data;
    if (res.result) {
      setPeople(res.data);
    }
  };

  useEffect(() => {
    fetchNumberOfPeopleServer();
  }, []);
  return (
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
      <div style={{ fontSize: "3rem" }}> WELCOME MANAGER </div>
      <div style={{ fontSize: "2rem" }}> Navigate through menu </div>
      {people && <div> Numri i i rezervimeve te kryera eshte {people}</div>}
    </div>
  );
};
export default ManagerPage;
