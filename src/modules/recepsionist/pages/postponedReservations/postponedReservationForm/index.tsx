import QRCode from "qrcode.react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, FormFeedback, Input, Label, Row } from "reactstrap";
import SearchSelect from "../../../../../main/components/ServerSideSelect";
import formValidationManager from "../../../../../main/utils/formValidationManager";

const PostponedReservationForm = (props: any) => {
  const { model, backEndId } = props;
  const { control } = useFormContext<any>();
  const navigate = useNavigate();

  const ref = React.createRef();

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Row>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {backEndId != 0 && (
            <Button
              color="primary"
              className="px-5 mt-4"
              onClick={() => navigate(`/recepsionist/reservation/${backEndId}`)}
            >
              DETAJET
            </Button>
          )}
          {backEndId != 0 && (
            <Col md={12}>
              <QRCode
                value={`https://localhost:3000/recepsionist/reservations/${backEndId}`}
                renderAs="canvas"
              />
            </Col>
          )}
        </div>
      </Row>
    </Form>
  );
};

export default PostponedReservationForm;
