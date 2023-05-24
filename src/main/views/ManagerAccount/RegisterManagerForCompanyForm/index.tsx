import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Popover,
  PopoverBody,
} from "reactstrap";
import formValidationManager from "../../../../main/utils/formValidationManager";
import { createAlert } from "../../../../main/store/stores/notification/notification.store";
import eNotificationType from "../../../../main/assets/enums/eNotificationType";
import InputIcon from "../../../../main/components/InputIcon";

const RegisterManagerForCompanyFormView = (props: any) => {
  const { id } = props;

  const { handleSubmit, control, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputType, setInputType] = useState("password");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [checks, setChecks] = useState({
    capsLetterCheck: false,
    lowsLetterCheck: false,
    numberCheck: false,
    pwdLengthCheck: false,
    specialCharCheck: false,
  });

  const onSubmit = async (data: any) => {
    data["userName"] = data.firstName + data.lastName;
    data["role"] = "manager";
    if (id) data["companyId"] = parseInt(id);
    try {
      const res: any = await axios.post("authentication/register", data);
      if (res.data?.result) {
        dispatch(
          createAlert({
            message: `Manager registered successfully for this company`,
            type: eNotificationType.Success,
            timeout: 3000,
          })
        );
        navigate("/admin/companies");
      } else {
        dispatch(
          createAlert({
            message: "WRONG",
            type: eNotificationType.Success,
            timeout: 3000,
          })
        );
      }
    } catch (err: any) {
      Error(err.message);
    }
  };

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

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Controller
            control={control}
            defaultValue=""
            name={"firstName" as any}
            rules={{
              required: true,
              minLength: {
                value: 2,
                message: "Min Length is 2",
              },
              pattern: {
                value: /^[^\s]+(?:$|.*[^\s]+$)/,
                message:
                  "Entered value cant start/end or contain only white spacing",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Label for="firstName">First Name :</Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
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
            name={"lastName" as any}
            defaultValue=""
            rules={{
              required: true,
              minLength: {
                value: 2,
                message: "Min Length is 2",
              },
              pattern: {
                value: /^[^\s]+(?:$|.*[^\s]+$)/,
                message:
                  "Entered value cant start/end or contain only white spacing",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Label for="lastName"> Last Name :</Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
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
            name={"email" as any}
            defaultValue=""
            rules={{
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format ",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Label for="email">Email:</Label>
                <Input
                  type="email"
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
        <FormGroup className="w-100">
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
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Label>Phone number:</Label>
                <PhoneInput
                  inputStyle={{ width: "100%" }}
                  enableSearch={true}
                  disableSearchIcon={true}
                  preferredCountries={["it"]}
                  country={"it"}
                  onlyCountries={["it"]}
                  placeholder="Phone number"
                  disableDropdown={true}
                  value={value}
                  onChange={(
                    value: any,
                    data: any,
                    event: any,
                    formattedValue: any
                  ) => {
                    onChange(
                      formattedValue.split(" ")[0] +
                        value.slice(formattedValue.split(" ")[0].length - 1)
                    );
                  }}
                  isValid={error === undefined}
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

        <FormGroup>
          <Controller
            control={control}
            name={"password" as any}
            defaultValue=""
            rules={{
              required: true,
              pattern: {
                value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                message:
                  "Password must be at least 8 characters with 1 upper case, 1 lower case letter, 1 special character and 1 number",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Label for="password">Password :</Label>
                <InputIcon
                  type={inputType}
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
                  value={value}
                  id="password"
                  onChange={onChange}
                  name="password"
                  error={error}
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
          isOpen={isPopoverOpen}
          placement="top-end"
          target={"password"}
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
                    checks.capsLetterCheck ? "text-success" : "text-danger"
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
                    checks.lowsLetterCheck ? "text-success" : "text-danger"
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
                    checks.numberCheck ? "text-success" : "text-danger"
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
                    checks.pwdLengthCheck ? "text-success" : "text-danger"
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
                    checks.specialCharCheck ? "text-success" : "text-danger"
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

        <Col>
          <Button type="submit" color="primary" className="me-2">
            Register
          </Button>

          <Button type="reset" onClick={() => reset()} color="secondary">
            Reset
          </Button>
        </Col>
      </Form>
    </Container>
  );
};

export default RegisterManagerForCompanyFormView;
