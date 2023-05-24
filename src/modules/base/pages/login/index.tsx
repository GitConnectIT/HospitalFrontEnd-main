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
  Input,
  FormFeedback,
  Spinner,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import { useDispatch } from "react-redux";
import InputIcon from "../../../../main/components/InputIcon";
import formValidationManager from "../../../../main/utils/formValidationManager";
import LoginModal from "./loginModal";
import AuthManager from "../../../../main/utils/authManager";

const LeftBg: string =
  require("../../../../main/assets/images/bg/login-bgleft.svg").default;
const RightBg: string =
  require("../../../../main/assets/images/bg/login-bg-right.svg").default;

const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputType, setInputType] = useState("password");
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);

  const { handleSubmit, control } = useForm();

  const onSubmit = async (data: any) => {
    setLoader(true);
    const loginUser = {
      email: data.email,
      password: data.password,
    };
    try {
      await AuthManager.login(loginUser, dispatch, navigate);
    } catch (err) {
      setLoader(false);
    }
  };

  return (
    <div className="loginBox position-relative">
      <Container fluid>
        <Row className="justify-content-center align-items-center login-wrapper">
          <Col className="loginContainer">
            <Card className="register-login-card">
              <CardBody>
                <h4 className="mb-0 fw-bold">
                 Login
                </h4>
                <small className="pb-4 d-block">
                    Do not have an account?
                  <Link
                    className="text-primary text-decoration-underline p-1"
                    to="/register"
                  >
                   Sign Up
                  </Link>
                </small>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <FormGroup>
                    <Controller
                      control={control}
                      name={"email" as any}
                      defaultValue=""
                      rules={{
                        required: true,
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Entered value does not match email format",
                        },
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <Label for="email">
                            {" "}
                            Email:
                          </Label>
                          <Input
                            type="text"
                            name="email"
                            id="email"
                            value={value as string}
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
                  <FormGroup>
                    <Controller
                      control={control}
                      name={"password" as any}
                      rules={{
                        required: true,
                      }}
                      defaultValue=""
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <Label for="password">
                           Password
                            :
                          </Label>
                          <InputIcon
                            type={inputType}
                            onChange={onChange}
                            value={value}
                            error={error}
                            id="password"
                            name="password"
                            iconName={
                              inputType === "password"
                                ? "fa-solid fa-eye"
                                : "fa-solid fa-eye-slash"
                            }
                            onIconClick={
                              inputType === "password"
                                ? () => setInputType("text")
                                : () => setInputType("password")
                            }
                          />

                          <FormFeedback>
                            {formValidationManager.extractError(error)}
                          </FormFeedback>
                        </>
                      )}
                    />
                  </FormGroup>
                  <FormGroup className="form-check d-flex" inline>
                    <small
                      onClick={() => {
                        setShowModal(true);
                      }}
                      className="text-primary ms-auto text-decoration-none cursor-pointer"
                    >
                      Forgot Password?
                    </small>
                  </FormGroup>
                  <Button disabled={loader} type="submit" color="primary">
                    {loader && <Spinner className="me-1" size={"sm"} />}
                    Login
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {showModal && (
        <LoginModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default LoginPage;
