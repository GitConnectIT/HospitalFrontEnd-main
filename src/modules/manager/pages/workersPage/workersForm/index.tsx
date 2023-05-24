import React, { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import eRoleType from "../../../../../main/assets/enums/eRoleType";
import Select from "../../../../../main/components/Select";
import formValidationManager from "../../../../../main/utils/formValidationManager";
import SearchSelect from "../../../../../main/components/SearchSelect";
import eFormMode from "../../../../../main/assets/enums/eFormMode";

const WorkersForm = (props: any) => {
  const { model, modeDrawer } = props;
  const { control } = useFormContext<any>();

  const roles = [
    { label: "Staff", value: "Staff" },
    { label: "Recepsionist", value: "Recepsionist" },
  ];

  // const role = roles.find((role: any) => role.value === model.role);

  console.log(model, "MODEL", control);
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Controller
              control={control}
              name="firstName"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="firstName"
                    invalid={error !== undefined}
                  />
                  <FormFeedback>
                    {formValidationManager.extractError(error)}
                  </FormFeedback>
                </>
              )}
            />
          </FormGroup>
        </Col>

        <Col md={12}>
          <FormGroup>
            <Controller
              control={control}
              name="lastName"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="lastName"
                    invalid={error !== undefined}
                  />
                  <FormFeedback>
                    {formValidationManager.extractError(error)}
                  </FormFeedback>
                </>
              )}
            />{" "}
          </FormGroup>
        </Col>

        <Col md={12}>
          <FormGroup>
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
            />{" "}
          </FormGroup>
        </Col>

        <Col md={12}>
          <FormGroup>
            <Controller
              control={control}
              name="phoneNumber"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
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
            />{" "}
          </FormGroup>
        </Col>
        {modeDrawer == eFormMode.Insert ? (
          <>
            <Col md={12}>
              <FormGroup>
                <Controller
                  control={control}
                  name="role"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <Label htmlFor="role">Role </Label>
                      <Select
                        value={value}
                        onChange={onChange}
                        options={roles}
                        autoResolve={false}
                      />
                      <FormFeedback>
                        {formValidationManager.extractError(error)}
                      </FormFeedback>
                    </>
                  )}
                />{" "}
              </FormGroup>
            </Col>
          </>
        ) : (
          <></>
        )}
      </Row>
    </Form>
  );
};

export default WorkersForm;
