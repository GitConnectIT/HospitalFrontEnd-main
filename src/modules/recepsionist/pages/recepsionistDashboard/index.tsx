import QRCode from "qrcode.react";
import React from "react";
import { FC } from "react";
import BreadCrumbs from "../../../../main/components/Breadcrumbs";
import useGetUser from "../../../../main/hooks/useGetUser";
// import Dashboard1 from "../tempDashboard";

const RecepsionistPage: FC = () => {
  const user = useGetUser();

  return (
    <>
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
        <div style={{ fontSize: "3rem" }}> WELCOME RECEPSIONIST</div>
        <div style={{ fontSize: "2rem" }}> Navigate through menu </div>
      </div>
    </>
  );
};

export default RecepsionistPage;
