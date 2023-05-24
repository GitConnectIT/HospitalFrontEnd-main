import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Label,
  FormGroup,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormFeedback,
  Popover,
  PopoverBody,
} from "reactstrap";
import "./index.scss";
import { useDispatch } from "react-redux";
import InputIcon from "../../../../main/components/InputIcon";
import formValidationManager from "../../../../main/utils/formValidationManager";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { createAlert } from "../../../../main/store/stores/notification/notification.store";
import eNotificationType from "../../../../main/assets/enums/eNotificationType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const LeftBg: string =
  require("../../../../main/assets/images/bg/login-bgleft.svg").default;
const RightBg: string =
  require("../../../../main/assets/images/bg/login-bg-right.svg").default;

const logo: string =
  require("../../../../main/assets/images/landing-page/Official-Logo.svg").default;
const NewPasswordPage: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  let token = searchParams.get("token");
  const email = searchParams.get("email");

  token = token ? token.replace(/\s/g, "+") : null;

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [checks, setChecks] = useState({
    capsLetterCheck: false,
    lowsLetterCheck: false,
    numberCheck: false,
    pwdLengthCheck: false,
    specialCharCheck: false,
  });
  const handleOnFocus = () => {
    setIsPopoverOpen(true);
  };
  const handleOnBlur = () => {
    setIsPopoverOpen(false);
  };

  const handleOnKeyUp = (e: any) => {
    const { value } = e.target;
    const capsLetterCheck = /[A-Z]/.test(value);
    const lowsLetterCheck = /[a-z]/.test(value);
    const numberCheck = /[0-9]/.test(value);
    const pwdLengthCheck = value.length >= 8;
    const specialCharCheck = /[!@#$%^&*]/.test(value);
    setChecks({
      capsLetterCheck,
      lowsLetterCheck,
      numberCheck,
      pwdLengthCheck,
      specialCharCheck,
    });
  };

  const dispatch = useDispatch();

  const [newPasswordType, setNewPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const { handleSubmit, control } = useForm();

  const onSubmit = async (data: any) => {
    const dataEdited = {
      password: data.password,
      confirmPassword: data.confirmPassword,
      email: email,
      token: token,
    };

    const response = await axios.post(
      "/authentication/reset-password",
      dataEdited
    );

    if (response?.data.result) {
      dispatch(
        createAlert({
          message: `Password cambiata con successo`,
          type: eNotificationType.Success,
          timeout: 3000,
        })
      );
      navigate("/login");
    }
  };

  return (
    <div className="loginBox">
      <img
        width="280px"
        src={LeftBg}
        alt=""
        className="position-absolute left bottom-0"
      />
      <img src={RightBg} alt="" className="position-absolute end-0 top" />
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col className="loginContainer">
            <Card className="register-login-card">
              <CardBody>
                <div className="w-75 my-3 mx-auto">
                  <img className="w-100" src={logo} alt="Logo" />
                  <h4 className="text-center my-3">{email}</h4>
                </div>

                <Form onSubmit={handleSubmit(onSubmit)}>
                  <FormGroup>
                    <Controller
                      control={control}
                      name="password"
                      rules={{
                        required: true,
                        pattern: {
                          value:
                            /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                          message: `Password must be at least 8 characters with 1 upper case, 1 lower case letter, 1 special character and 1 number.`,
                        },
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <Label for="password"> New Password</Label>
                          <InputIcon
                            type={newPasswordType}
                            onChange={onChange}
                            value={value}
                            error={error}
                            id="password"
                            name="password"
                            iconName={
                              newPasswordType === "password"
                                ? "fa-solid fa-eye"
                                : "fa-solid fa-eye-slash"
                            }
                            onIconClick={
                              newPasswordType === "password"
                                ? () => setNewPasswordType("text")
                                : () => setNewPasswordType("password")
                            }
                            onFocus={handleOnFocus}
                            onBlur={handleOnBlur}
                            onKeyUp={handleOnKeyUp}
                          />

                          <FormFeedback>
                            {formValidationManager.extractError(error)}
                          </FormFeedback>
                        </>
                      )}
                    />
                  </FormGroup>
                  <Popover
                    flip
                    className="opacity-75"
                    isOpen={isPopoverOpen}
                    placement="left-start"
                    target={"password"}
                    toggle={function noRefCheck() {}}
                  >
                    <PopoverBody className="p-1 m-0">
                      <div className="message">
                        <p style={{ margin: "0.1rem" }}>
                          <FontAwesomeIcon
                            style={{
                              marginRight: "0.5rem",
                            }}
                            size="lg"
                            className={`${
                              checks.capsLetterCheck
                                ? "text-success"
                                : "text-danger"
                            }`}
                            icon={
                              `fa-solid fa-${
                                checks.capsLetterCheck ? "check" : "xmark"
                              }` as any
                            }
                          />
                          At least 1 uppercase
                        </p>
                        <p style={{ margin: "0.1rem" }}>
                          <FontAwesomeIcon
                            style={{ marginRight: "0.5rem" }}
                            size="lg"
                            className={`${
                              checks.lowsLetterCheck
                                ? "text-success"
                                : "text-danger"
                            }`}
                            icon={
                              `fa-solid fa-${
                                checks.lowsLetterCheck ? "check" : "xmark"
                              }` as any
                            }
                          />
                          At least 1 lowercase
                        </p>
                        <p style={{ margin: "0.1rem" }}>
                          <FontAwesomeIcon
                            style={{ marginRight: "0.5rem" }}
                            size="lg"
                            className={`${
                              checks.numberCheck
                                ? "text-success"
                                : "text-danger"
                            }`}
                            icon={
                              `fa-solid fa-${
                                checks.numberCheck ? "check" : "xmark"
                              }` as any
                            }
                          />
                          At least 1 number
                        </p>
                        <p style={{ margin: "0.1rem" }}>
                          <FontAwesomeIcon
                            style={{ marginRight: "0.5rem" }}
                            size="lg"
                            className={`${
                              checks.pwdLengthCheck
                                ? "text-success"
                                : "text-danger"
                            }`}
                            icon={
                              `fa-solid fa-${
                                checks.pwdLengthCheck ? "check" : "xmark"
                              }` as any
                            }
                          />
                          Minimum 8 characters
                        </p>
                        <p style={{ margin: "0.1rem" }}>
                          <FontAwesomeIcon
                            style={{ marginRight: "0.5rem" }}
                            size="lg"
                            className={`${
                              checks.specialCharCheck
                                ? "text-success"
                                : "text-danger"
                            }`}
                            icon={
                              `fa-solid fa-${
                                checks.specialCharCheck ? "check" : "xmark"
                              }` as any
                            }
                          />
                          At least 1 special character
                        </p>
                      </div>
                    </PopoverBody>
                  </Popover>

                  <FormGroup>
                    <Controller
                      control={control}
                      name="confirmPassword"
                      rules={{
                        required: true,
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <Label for="confirmPassword"> Confirm Password</Label>
                          <InputIcon
                            type={confirmPasswordType}
                            onChange={onChange}
                            value={value}
                            error={error}
                            iconName={
                              confirmPasswordType === "password"
                                ? "fa-solid fa-eye"
                                : "fa-solid fa-eye-slash"
                            }
                            onIconClick={
                              confirmPasswordType === "password"
                                ? () => setConfirmPasswordType("text")
                                : () => setConfirmPasswordType("password")
                            }
                          />

                          <FormFeedback>
                            {formValidationManager.extractError(error)}
                          </FormFeedback>
                        </>
                      )}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button type="submit" color="primary" className="me-2">
                      Update
                    </Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NewPasswordPage;
