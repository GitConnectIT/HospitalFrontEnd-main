import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  Row,
  Col,
  FormGroup,
  Label,
  FormFeedback,
  Form,
  Button,
} from "reactstrap";

import eNotificationType from "../../../assets/enums/eNotificationType";
import { createAlert } from "../../../store/stores/notification/notification.store";
import formValidationManager from "../../../utils/formValidationManager";
import axios from "axios";
import { Trans } from "react-i18next";
import InputIcon from "../../InputIcon";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface IChangePasswordProps {
  onSubmit?: () => void;
}

const ChangePassword: FC<IChangePasswordProps> = (
  props: IChangePasswordProps
) => {
  //const { onSubmit } = props;
  const formObject = useForm();
  const dispatch = useDispatch();
  const { handleSubmit } = formObject;
  const { control } = formObject;

  const handleFormSubmit = async (dataToPost: any) => {
    console.log("Password", dataToPost);
    let response = await axios.put(
      "/authentication/change-password",
      dataToPost
    );
    console.log("response", response);
    try {
      if (response.data === true) {
        dispatch(
          createAlert({
            message: "Password cambiata con successo.",
            type: eNotificationType.SUCCESS,
            timeout: 3000,
          })
        );
      }
      // if (onSubmit) {
      //   onSubmit();
      // }
    } catch (err) {
      dispatch(
        createAlert({
          message: "" + err,
          type: eNotificationType.ERROR,
          timeout: 3000,
        })
      );
    }
  };

  return (
    <>
      <Row>
        <Col sm="12">
          <div className="p-4">
            <Form>
              <Row>
                <Col sm="6" lg="12" xl="6">
                  {" "}
                  <FormGroup>
                    <Label htmlFor="currentPassword">
                      <Trans i18nKey={"generic.currentPassword"}>
                        Current Password
                      </Trans>
                    </Label>
                    <Controller
                      control={control}
                      name="currentPassword"
                      rules={{ required: true }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <InputIcon
                            iconName="fa-solid fa-key"
                            id="currentPassword"
                            //className="form-control icon"
                            type="password"
                            name="currentPassword"
                            placeholder="password attuale"
                            value={value}
                            onChange={onChange}
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
              </Row>
              <Row>
                <Col sm="6" lg="12" xl="6">
                  <FormGroup>
                    <Label htmlFor="firstName">
                      <Trans i18nKey={"generic.newPassword"}>
                        New Password
                      </Trans>
                    </Label>
                    <Controller
                      control={control}
                      name="newPassword"
                      rules={{ required: true }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <InputIcon
                            iconName="fa-solid fa-key"
                            id="newPassword"
                            //className="form-control icon"
                            type="password"
                            name="newPassword"
                            placeholder="nuova password"
                            value={value}
                            onChange={onChange}
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
                <Col sm="6" lg="12" xl="6">
                  <FormGroup>
                    <Label htmlFor="confirmPassword">
                      <Trans i18nKey={"generic.confirmPassword"}>
                        Confirm Password
                      </Trans>
                    </Label>
                    <Controller
                      control={control}
                      name={"confirmPassword" as any}
                      rules={{
                        required: true,
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <InputIcon
                            iconName="fa-solid fa-key"
                            id="confirmPassword"
                            //className="form-control"
                            type="password"
                            name="confirmPassword"
                            placeholder="conferma password"
                            value={value}
                            onChange={onChange}
                            invalid={error !== undefined}
                          />
                        </>
                      )}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="text-end">
                  <Button
                    //outline
                    color="primary"
                    style={{ borderRadius: "1rem" }}
                    onClick={() => {
                      handleSubmit(handleFormSubmit)();
                    }}
                  >
                    <Trans i18nKey={"generic.changePassword"}>
                      Cambia la password
                    </Trans>
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ChangePassword;
