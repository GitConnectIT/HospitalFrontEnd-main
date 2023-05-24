import React, { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { Button, Col, Form, FormFeedback, Input, Label, Row } from "reactstrap";
import formValidationManager from "../../../../../main/utils/formValidationManager";
import SearchSelect from "../../../../../main/components/ServerSideSelect";
import axios from "axios";
import eFormMode from "../../../../../main/assets/enums/eFormMode";

const DeviceForm = (props: any) => {
  const { model, mode } = props;
  const { control } = useFormContext<any>();

  // const [servicesOptions, setServicesOptions] = useState<any>(); //ALL OPTIONS

  // const arrayObj = model.serviceIdsOptions.map((item: any) => {
  //   return {
  //     label: item.name,
  //     value: item.id,
  //   };
  // });

  // const fetchServices = async () => {
  //   const res: any = await (await axios.get("list/services")).data;
  //   console.log(res.data, "RES");
  //   setServicesOptions(res.data);
  // };

  // useEffect(() => {
  //   fetchServices();
  // }, []);

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Row>
        <Col md={12}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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

        {mode == eFormMode.Edit && (
          <>
            <Col md={12} style={{ marginTop: "1rem" }}>
              <Controller
                control={control}
                name="isActive"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Label htmlFor="isActive" style={{ marginRight: " 1rem" }}>
                      Active
                    </Label>
                    <Input
                      id="isActive"
                      type="checkbox"
                      name="isActive"
                      value={value}
                      checked={value}
                      onChange={(e) => {
                        onChange(e.target.checked);
                      }}
                      invalid={error !== undefined}
                    />
                    <FormFeedback>
                      {formValidationManager.extractError(error)}
                    </FormFeedback>
                  </>
                )}
              />
            </Col>
          </>
        )}

        <Col md={12} style={{ marginTop: "1rem" }}>
          <Controller
            control={control}
            name="serviceIds"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Label
                  htmlFor="serviceIdsOptions"
                  style={{ marginRight: " 1rem" }}
                >
                  Sherbimet
                </Label>
                <SearchSelect
                  controller="/list/device-services"
                  id="Add Services"
                  onChange={onChange}
                  value={value}
                />
                <FormFeedback>
                  {formValidationManager.extractError(error)}
                </FormFeedback>
              </>
            )}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default DeviceForm;
