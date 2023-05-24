import React, { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { Button, Col, Form, FormFeedback, Input, Label, Row } from "reactstrap";
import formValidationManager from "../../../../../main/utils/formValidationManager";
import SearchSelect from "../../../../../main/components/ServerSideSelect";
import axios from "axios";
import DateTimeInput from "../../../../../main/components/DateTimeInput";
import Select from "../../../../../main/components/Select";
import useGetUser from "../../../../../main/hooks/useGetUser";
import eRoleType from "../../../../../main/assets/enums/eRoleType";

const WorkingHourForm = (props: any) => {
  const { model, workerId } = props;
  const { control } = useFormContext<any>();

  const [services, setServices] = useState<any>();
  const [serviceSelected, setServiceSelected] = useState<boolean>(false);

  const user = useGetUser();

  const fetchServices = async () => {
    let res: any;

    if (user.role == eRoleType.Recepsionist) {
      res = await (
        await axios.post("list/services", {
          workerId: workerId,
        })
      ).data;
    } else {
      res = await (await axios.post("list/services", { workerId: 0 })).data;
    }

    setServices(res.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Row>
        <Col md={12}>
          <Controller
            control={control}
            name="startTime"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Label htmlFor="startTime">Start Time</Label>
                <DateTimeInput
                  value={value}
                  onChange={onChange}
                  error={error !== undefined}
                />
                {error && (
                  <FormFeedback>
                    {formValidationManager.extractError(error)}
                  </FormFeedback>
                )}
              </>
            )}
          />
        </Col>

        <Col md={12} style={{ marginTop: "1rem" }}>
          <Controller
            control={control}
            name="endTime"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Label htmlFor="endTime">End Time</Label>
                <DateTimeInput
                  value={value}
                  onChange={onChange}
                  error={error !== undefined}
                />
                {error && (
                  <FormFeedback>
                    {formValidationManager.extractError(error)}
                  </FormFeedback>
                )}
              </>
            )}
          />
        </Col>

        {services && (
          <Col md={12} style={{ marginTop: "1rem" }}>
            <Controller
              control={control}
              name="serviceId"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <Label htmlFor="serviceId">Sherbimi</Label>
                  <Select
                    value={value}
                    options={services}
                    error={error}
                    onChange={onChange}
                  />
                  {error && (
                    <FormFeedback>
                      {formValidationManager.extractError(error)}
                    </FormFeedback>
                  )}
                </>
              )}
            />
          </Col>
        )}

        {/* {serviceSelected && (
          <>
            <Col md={12} style={{ marginTop: "1rem" }}>
              <Controller
                control={control}
                name="deviceId"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Label htmlFor="serviceId">Sherbimi</Label>
                    <Select
                      value={value}
                      options={services}
                      error={error}
                      onChange={onChange}
                    />
                    {error && (
                      <FormFeedback>
                        {formValidationManager.extractError(error)}
                      </FormFeedback>
                    )}
                  </>
                )}
              />
            </Col>
          </>
        )} */}
      </Row>
    </Form>
  );
};

export default WorkingHourForm;
