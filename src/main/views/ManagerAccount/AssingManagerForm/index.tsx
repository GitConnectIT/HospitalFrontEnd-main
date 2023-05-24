import axios from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Label,
} from "reactstrap";
import eNotificationType from "../../../assets/enums/eNotificationType";
import { createAlert } from "../../../store/stores/notification/notification.store";
import formValidationManager from "../../../utils/formValidationManager";
import SearchSelect from "../../../../main/components/SearchSelect";

const AssignManagerFormView = (props: any) => {
  const { companyId } = props;
  const { handleSubmit, control, reset } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    console.log(data, "D");

    try {
      const res: any = await axios.put(
        `Companies/${companyId}/assignManager`,
        data
      );
      if (res.data?.result) {
        dispatch(
          createAlert({
            message: `Manager registered successfully for this company`,
            type: eNotificationType.Success,
            timeout: 3000,
          })
        );
      } else {
        dispatch(
          createAlert({
            message: "Something went wrong",
            type: eNotificationType.Error,
            timeout: 3000,
          })
        );
      }
    } catch (err: any) {
      Error(err.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        flexDirection: "column",
      }}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup className="w-50">
          <Controller
            control={control}
            defaultValue=""
            name={"managerId" as any}
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Label for="managerId">Manager</Label>
                <SearchSelect
                  controller="/List/managers/autocomplete"
                  id="Add Manager"
                  onChange={onChange}
                  value={value}
                />

                <FormFeedback>
                  {formValidationManager.extractError(error)}
                </FormFeedback>
              </>
            )}
          />
        </FormGroup>

        <div className="d-flex justify-content-start ">
          {" "}
          <Button> Assign </Button>
        </div>
      </Form>
    </div>
  );
};

export default AssignManagerFormView;
