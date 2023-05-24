import React, { FC } from "react";
import IProfileData from "../../../interfaces/controllers/IProfileData";
import { Row, Col } from "reactstrap";
import useGetUser from "../../../hooks/useGetUser";
import { Trans } from "react-i18next";

export interface IEntireProfileViewProps {
  userData: IProfileData;
}
const EntireProfileView: FC<IEntireProfileViewProps> = (
  props: IEntireProfileViewProps
) => {
  const { userData } = props;

  const user = useGetUser();

  return (
    userData && (
      <>
        <Row>
          <Col sm="12">
            <div className="p-4">
              <Row>
                <Col
                  xs="6"
                  md="3"
                  lg="6"
                  xxl="3"
                  className="d-flex flex-column align-items-center"
                >
                  <strong>
                    <Trans i18nKey={"generic.fullName"}>Full Name</Trans>
                  </strong>
                  <br />
                  <p className="text-muted">
                    {userData.firstName != null && userData.lastName != null
                      ? userData.firstName + " " + userData.lastName
                      : "No UserName yet"}
                  </p>
                </Col>
                <Col
                  xs="6"
                  md="3"
                  lg="6"
                  xxl="3"
                  className="d-flex flex-column align-items-center border-start"
                >
                  <strong>
                    <Trans i18nKey={"generic.mobile"}>Mobile</Trans>
                  </strong>
                  <br />
                  <p className="text-muted">
                    {userData.phoneNumber != null
                      ? userData.phoneNumber
                      : "No phone number yet"}
                  </p>
                </Col>
                <Col
                  xs="6"
                  md="3"
                  lg="6"
                  xxl="3"
                  className="d-flex flex-column align-items-center border-start-md border-start-lg-0 border-start-xxl"
                >
                  <strong>
                    <Trans i18nKey={"generic.email"}>Email</Trans>
                  </strong>
                  <br />
                  <p className="text-muted text-break">{user.email}</p>
                </Col>
                <Col
                  xs="6"
                  md="3"
                  lg="6"
                  xxl="3"
                  className="d-flex flex-column align-items-center border-start"
                >
                  <strong>
                    <Trans i18nKey={"generic.location"}>Location</Trans>
                  </strong>
                  <br />
                  <p className="text-muted">
                    {userData.address != null
                      ? userData.address
                      : "No adress yet"}
                  </p>
                </Col>

                <Col
                  xs="6"
                  md="3"
                  lg="6"
                  xxl="3"
                  className="d-flex flex-column align-items-center"
                >
                  <strong>
                    <Trans i18nKey={"generic.city"}>City</Trans>
                  </strong>
                  <br />
                  <p className="text-muted">
                    {userData.city != null ? userData.city : "No city yet"}
                  </p>
                </Col>

                <Col
                  xs="6"
                  md="3"
                  lg="6"
                  xxl="3"
                  className="d-flex flex-column align-items-center border-start"
                >
                  <strong>
                    <Trans i18nKey={"generic.zipcode"}>Cap</Trans>
                  </strong>
                  <br />
                  <p className="text-muted">
                    {userData.zipCode != null
                      ? userData.zipCode
                      : "No zipCode yet"}
                  </p>
                </Col>
              </Row>
              {/* <div className="text-center mt-4">
              </div> */}
            </div>
          </Col>
        </Row>
      </>
    )
  );
};

export default EntireProfileView;
