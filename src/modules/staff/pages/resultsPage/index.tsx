import axios from "axios";
import React, { FC, useState } from "react";
import Table from "../../../../main/components/table/index";
import eFormMode from "../../../../main/assets/enums/eFormMode";
import PageTitle from "../../../../main/components/PageTitle";
import { useDispatch } from "react-redux";
import { createAlert } from "../../../../main/store/stores/notification/notification.store";
import eNotificationType from "../../../../main/assets/enums/eNotificationType";
import EventManager from "../../../../main/utils/eventManager";
import DetailDrawer from "../../../../main/components/DetailDrawer";
import Drawer from "../../../../main/components/Drawer";
import { Button, Col, Form, FormFeedback, Input, Label, Row } from "reactstrap";
import formValidationManager from "../../../../main/utils/formValidationManager";
import { Controller, useForm } from "react-hook-form";

const ResultsPage = () => {
  const [modeDrawer, setModeDrawer] = useState(null);
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>(null);

  const { control, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onIconClick = async (rowId: number, actionMethod: string) => {
    switch (actionMethod) {
      case eFormMode.Edit:
        const m = await (await axios.get(`reservation/${rowId}`)).data;
        setFormData(m.data);
        setOpen(true);
        break;

      case eFormMode.Insert:
        dispatch(
          createAlert({
            message: `No actions can be comitted here by you`,
            type: eNotificationType.Error,
            timeout: 3000,
          })
        );
        break;
    }
  };

  const handleClose = () => {
    setModeDrawer(null);
    setOpen(false);
  };

  const handleFormSubmit = async (data: any) => {
    Object.assign(data, { email: formData.email });
    const res: any = await axios.put(
      `/reservation/${formData.id}/submit-result`,
      data
    );

    if (res.data) {
      dispatch(
        createAlert({
          message: `Result sent to client via email`,
          type: eNotificationType.Success,
          timeout: 3000,
        })
      );
      EventManager.raiseRefreshTable("reservation/succeeded");
      handleClose();
    }
  };

  return (
    <>
      <Table
        pageTitle={<PageTitle>Reservations</PageTitle>}
        controller={"reservation/succeeded"}
        onIconClick={onIconClick}
      />
      <Drawer
        title="Submit Result"
        show={open}
        onClose={handleClose}
        actions={
          <>
            <Button
              color="primary"
              type="submit"
              onClick={() => handleSubmit(handleFormSubmit)()}
              //   disabled={Object.keys(formState.dirtyFields).length === 0}
            >
              Approve
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                handleClose();
                reset();
              }}
            >
              Cancel
            </Button>
          </>
        }
      >
        <Form onSubmit={(e) => e.preventDefault()}>
          <Row>
            <Col md={12}>
              <Controller
                control={control}
                name="result"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Label htmlFor="Result">Result</Label>
                    <Input
                      id="Result"
                      type="textarea"
                      value={value}
                      onChange={onChange}
                      placeholder="Result"
                      invalid={error !== undefined}
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
          </Row>
        </Form>
      </Drawer>
      {/* )} */}
    </>
  );
};

export default ResultsPage;
