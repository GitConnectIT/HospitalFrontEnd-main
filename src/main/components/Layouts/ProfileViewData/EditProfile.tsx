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

import IProfileData from "../../../interfaces/controllers/IProfileData";
import eNotificationType from "../../../assets/enums/eNotificationType";
import { createAlert } from "../../../store/stores/notification/notification.store";
//import DateInput from "../../../../main/components/Date";
import formValidationManager from "../../../utils/formValidationManager";
import axios from "axios";
import moment from "moment";
//import SearchSelect from "../../SearchSelect";
import TelInput from "../../TelInput";
import { Trans } from "react-i18next";
import ChangePassword from "./ChangePassword";
import InputIcon from "../../InputIcon";

export interface IEditProfileProps {
  userData: IProfileData;
  onSubmit?: () => void;
}

const EditProfle: FC<IEditProfileProps> = (props: IEditProfileProps) => {
  const { userData, onSubmit } = props;
  const formObject = useForm({ defaultValues: userData });
  const dispatch = useDispatch();
  const { handleSubmit } = formObject;
  const { control } = formObject;

  const handleFormSubmit = async (dataToPost: any) => {
    let simpleDate = dataToPost.birthday.replace(
      /(\d{2})\/(\d{2})\/(\d{4})/,
      "$2/$1/$3"
    );
    let fullDate = moment(simpleDate).toISOString();
    dataToPost.birthday = fullDate;

    let response = await (await axios.put("user", dataToPost)).data;
    try {
      if (response.result === true) {
        dispatch(
          createAlert({
            message: "I tuoi dati sono stati salvati con successo",
            type: eNotificationType.SUCCESS,
            timeout: 3000,
          })
        );
      }
      if (onSubmit) {
        onSubmit();
      }
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

  // const genderOptions = [
  //   { value: "M", label: "Male" },
  //   { value: "F", label: "Female" },
  //   { value: "N", label: "Neutral" },
  // ];

  return (
    <>
      {/* <Row>
          <ChangePassword />
          <hr />
        </Row> */}
      <Row>
        <Col sm="12">
          <ChangePassword />
          <hr />
          <div className="p-4">
            <Form>
              <Row>
                <Col sm="6" lg="12" xl="6">
                  {" "}
                  <FormGroup>
                    <Label htmlFor="firstName">
                      <Trans i18nKey={"generic.firstName"}>First Name</Trans>
                    </Label>
                    <Controller
                      control={control}
                      name="firstName"
                      rules={{ required: true }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <InputIcon
                            iconName="fa-solid fa-user"
                            id="firstName"
                            //className="form-control"
                            type="text"
                            name="firstName"
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
                {/* <Col sm="6" lg="12" xl="6">
                  {" "}
                  <FormGroup>
                    <Label htmlFor="lastName">
                      <Trans i18nKey={"generic.lastName"}>Last Name</Trans>
                    </Label>
                    <Controller
                      control={control}
                      name="lastName"
                      rules={{ required: true }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <InputIcon
                            iconName="fa-solid fa-user"
                            id="lastName"
                            //className="form-control"
                            type="text"
                            name="lastName"
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
                </Col> */}
                <Col sm="6" lg="12" xl="6">
                  <FormGroup>
                    <Label htmlFor="address">
                      <Trans i18nKey={"generic.location"}>Address</Trans>
                    </Label>
                    <Controller
                      control={control}
                      name="address"
                      rules={{ required: true }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <InputIcon
                            iconName="fa-solid fa-location-dot"
                            id="address"
                            //className="form-control"
                            type="text"
                            name="address"
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
                    <Label htmlFor="city">
                      <Trans i18nKey={"generic.city"}>City</Trans>
                    </Label>
                    <Controller
                      control={control}
                      name="city"
                      rules={{ required: true }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <InputIcon
                            iconName="fa-solid fa-city"
                            id="city"
                            //className="form-control"
                            type="text"
                            name="city"
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
                    <Label htmlFor="zipCode">
                      <Trans i18nKey={"generic.zipcode"}>Zip code</Trans>
                    </Label>
                    <Controller
                      control={control}
                      name="zipCode"
                      rules={{ required: true }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <InputIcon
                            iconName="fa-solid fa-envelopes-bulk"
                            id="zipCode"
                            //className="form-control"
                            type="text"
                            name="zipCode"
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
                    <Label htmlFor="phone">
                      <Trans i18nKey={"generic.phoneNumber"}>
                        Phone Number
                      </Trans>
                    </Label>
                    <Controller
                      control={control}
                      name="phoneNumber"
                      rules={{
                        required: true,
                        minLength: {
                          value: 10,
                          message: "Phone number should be longer than 10",
                        },
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <TelInput
                            onChange={onChange}
                            value={value}
                            error={error}
                            id="phone"
                          />
                          <div
                            style={{
                              color: " #fc4b6c",
                              fontSize: "0.875em",
                              marginTop: "0.25rem",
                            }}
                          >
                            {formValidationManager.extractError(error)}
                          </div>
                        </>
                      )}
                    />
                  </FormGroup>
                </Col>

                <Col sm="6" lg="12" xl="6">
                  <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Controller
                      control={control}
                      name="email"
                      rules={{ required: true }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <InputIcon
                            iconName="fa-solid fa-envelope"
                            id="email"
                            //className="form-control"
                            type="email"
                            name="email"
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

                <Col className="text-end">
                  <Button
                    color="primary"
                    style={{ borderRadius: "1rem" }}
                    onClick={() => {
                      handleSubmit(handleFormSubmit)();
                    }}
                  >
                    <Trans i18nKey={"generic.submit"}>Submit</Trans>
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

export default EditProfle;
