import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import eFormMode from "../../../../main/assets/enums/eFormMode";
import DetailDrawer from "../../../../main/components/DetailDrawer";
import WorkingHourForm from "../../../staff/pages/ServiceHourPage/workingHourForm";
import "./style.scss";

const PublishTime = () => {
  const [staff, setStaff] = useState<any>("");
  const [staffSelected, setStaffSelected] = useState<any>(0);

  const getAllWorkes = async () => {
    const res: any = await (await axios.get("/user/get-workers")).data;
    setStaff(res.data);
  };

  useEffect(() => {
    getAllWorkes();
  }, []);

  const handleClose = () => {
    setStaffSelected(0);
  };

  return (
    <div
      style={{ border: "1px solid grey", marginTop: "1rem", padding: "1rem" }}
    >
      <Row className="mt-1">
        <ListGroup>
          {staff &&
            staff.map((s: any) => {
              return (
                // <Col md={6} sm={3} xs={12}>
                <ListGroupItem>
                  <div
                    className="selectStaff"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                    onClick={() => setStaffSelected(s.id)}
                  >
                    {s.firstName} {s.lastName}
                  </div>
                </ListGroupItem>
                // </Col>
              );
            })}
        </ListGroup>
      </Row>

      {staffSelected != 0 && (
        <DetailDrawer
          onClose={handleClose}
          onSave={() => {
            handleClose();
          }}
          modeDrawer={eFormMode.Insert}
          formData={[]}
          controller="workingHourServices"
          additionalProp2={staffSelected}
        >
          <WorkingHourForm workerId={staffSelected} />
        </DetailDrawer>
      )}
    </div>
  );
};

export default PublishTime;
