import QRCode from "qrcode.react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, FormFeedback, Input, Label, Row } from "reactstrap";
import SearchSelect from "../../../../../main/components/ServerSideSelect";
import formValidationManager from "../../../../../main/utils/formValidationManager";
import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import DocumentDownload from "../DocumentQrCode";

const ReservationForm = (props: any) => {
  const { model, backEndId } = props;
  const { control } = useFormContext<any>();
  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);

  const getReservationData = async () => {
    const m = await (await axios.get(`reservation/${backEndId}/details`)).data;
    setData(m.data);
  };

  useEffect(() => {
    if (backEndId) getReservationData();
  }, [backEndId]);

  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col md={12}>
            <Controller
              control={control}
              name="clientId"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <Label htmlFor="clientId">ID e klientit </Label>
                  <Input
                    id="clientId"
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="clientId"
                    invalid={error !== undefined}
                  />
                  <FormFeedback>
                    {formValidationManager.extractError(error)}
                  </FormFeedback>
                </>
              )}
            />
          </Col>

          <Col md={12}>
            <Controller
              control={control}
              name="name"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <Label htmlFor="Name">Name</Label>
                  <Input
                    id="Name"
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="Name"
                    invalid={error !== undefined}
                  />
                  <FormFeedback>
                    {formValidationManager.extractError(error)}
                  </FormFeedback>
                </>
              )}
            />
          </Col>

          <Col md={12}>
            <Controller
              control={control}
              name="surname"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <Label htmlFor="surName">Surname</Label>
                  <Input
                    id="surName"
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="surName"
                    invalid={error !== undefined}
                  />
                  <FormFeedback>
                    {formValidationManager.extractError(error)}
                  </FormFeedback>
                </>
              )}
            />
          </Col>

          <Col md={12}>
            <Controller
              control={control}
              name="phoneNumber"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <Label htmlFor="phoneNumber">phoneNumber</Label>
                  <Input
                    id="phoneNumber"
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="phoneNumber"
                    invalid={error !== undefined}
                  />
                  <FormFeedback>
                    {formValidationManager.extractError(error)}
                  </FormFeedback>
                </>
              )}
            />
          </Col>

          <Col md={12}>
            <Controller
              control={control}
              name="email"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="email"
                    invalid={error !== undefined}
                  />
                  <FormFeedback>
                    {formValidationManager.extractError(error)}
                  </FormFeedback>
                </>
              )}
            />
          </Col>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {backEndId != 0 && (
              <>
                <Button
                  color="primary"
                  className="px-5 mt-4"
                  onClick={() =>
                    navigate(`/recepsionist/reservations/${backEndId}`)
                  }
                >
                  DETAJET
                </Button>
                {/* <Button
                  color="primary"
                  className="px-5 mt-4"
                  onClick={() =>
                    navigate(`/recepsionist/reservations/pdf/${backEndId}`)
                  }
                >
                  VIEW AS PDF
                </Button> */}
              </>
            )}
            {backEndId != 0 && (
              <Col md={12}>
                <QRCode
                  id={`reservation${backEndId}`}
                  size={128}
                  level={"H"}
                  includeMargin={false}
                  value={`https://localhost:3000/recepsionist/reservations/${backEndId}`}
                  renderAs="canvas"
                />
              </Col>
            )}
          </div>
        </Row>
      </Form>

      {data && (
        <>
          <PDFDownloadLink
            document={<DocumentDownload model={data} backEndId={backEndId} />}
            fileName="detailsQrCode.pdf"
          >
            {({ loading }: any) =>
              loading ? "Loading document..." : "Download now!"
            }
          </PDFDownloadLink>
        </>
      )}
    </>
  );
};

export default ReservationForm;
