import React from "react";
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import FormValidationManager from "../../../utils/formValidationManager";
import PhoneInput from "react-phone-input-2";
import IUserData from "../../../interfaces/IUserData";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createAlert } from "../../../store/stores/notification/notification.store";
import eNotificationType from "../../../assets/enums/eNotificationType";
import Date from "../../../components/Date";

const ProfileEdit = (props: any) =>
{
    const {userData} = props;

    const { handleSubmit, control,reset } = useForm({defaultValues: {...userData}});

    const dispatch = useDispatch();

    const onSubmit = async (data: any) =>
    {
        const res: any = await axios.put(`user`, data );
        if(res.data.result)
        {
            dispatch(createAlert({
                message: res.data.successMessage,
                timeout: 3000,
                type: eNotificationType.Success
            }))
        }
    }

    return(
        <> 
        <Form className="mt-3"  >
        <Row>
            <Col md = "6">
                <FormGroup>
                    <Controller
                        control={control}
                        name="firstName"
                        rules={{
                            required: true,
                        }}
                        render={({
                        field: { onChange, value },
                        fieldState: { error },
                        }) => (
                        <>
                            <Label for="firstName">
                                First Name
                            </Label>
                            <Input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={value}
                            onChange={onChange}
                            invalid={error !== undefined}
                            />
                            <FormFeedback>
                                {FormValidationManager.extractError(error)}
                            </FormFeedback>
                        </>
                        )}
                    />
                </FormGroup>
            </Col>
            <Col md = "6">
                <FormGroup>
                    <Controller
                        control={control}
                        name="lastName"
                        rules={{
                            required: true,
                        }}
                        render={({
                        field: { onChange, value },
                        fieldState: { error },
                        }) => (
                        <>
                            <Label for="lastName">
                                Last Name
                            </Label>
                            <Input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={value}
                            onChange={onChange}
                            invalid={error !== undefined}
                            />
                            <FormFeedback>
                                {FormValidationManager.extractError(error)}
                            </FormFeedback>
                        </>
                        )}
                    />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col md = "6">
                <FormGroup>
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: true,
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Entered value does not match email format ",
                              },
                        }}
                        render={({
                        field: { onChange, value },
                        fieldState: { error },
                        }) => (
                        <>
                            <Label for="email">
                                Email
                            </Label>
                            <Input
                                type="text"
                                name="email"
                                id="email"
                                value={value}
                                onChange={onChange}
                                invalid={error !== undefined}
                            />
                            <FormFeedback>
                                {FormValidationManager.extractError(error)}
                            </FormFeedback>
                        </>
                        )}
                    />
                </FormGroup>
            </Col>
            <Col md = "6">
            <FormGroup>
                    <Controller
                        control={control}
                        name={"zipCode"}
                        rules={{
                            required: true,
                        }}
                        render={({
                        field: { onChange, value },
                        fieldState: { error },
                        }) => (
                        <>
                            <Label for="zipCode">
                                Zip Code
                            </Label>
                            <Input
                            type="text"
                            name="zipCode"
                            id="zipCode"
                            value={value}
                            onChange={onChange}
                            invalid={error !== undefined}
                            />
                            <FormFeedback>
                                {FormValidationManager.extractError(error)}
                            </FormFeedback>
                        </>
                        )}
                    />
                </FormGroup>
              
            </Col>
        </Row>
        <Row>
        <Col md = "6">
                <FormGroup>
                    <Controller
                        control={control}
                        name={"state"}
                        rules={{
                            required: true,
                        }}
                        render={({
                        field: { onChange, value },
                        fieldState: { error },
                        }) => (
                        <>
                            <Label for="state">
                                State
                            </Label>
                            
                            <Input
                                type="text"
                                name="state"
                                id="state"
                                value={value}
                                onChange={onChange}
                                invalid={error !== undefined}
                            />
                            <FormFeedback>
                                {FormValidationManager.extractError(error)}
                            </FormFeedback>
                        </>
                        )}
                    />
                </FormGroup>
            </Col>
            <Col md = "6">
                <FormGroup>
                    <Controller
                        control={control}
                        name={"address"}
                        rules={{
                            required: true,
                        }}
                        render={({
                        field: { onChange, value },
                        fieldState: { error },
                        }) => (
                        <>
                            <Label for="address">
                                Address
                            </Label>
                            <Input
                            type="text"
                            name="address"
                            id="address"
                            value={value}
                            onChange={onChange}
                            invalid={error !== undefined}
                            />
                            <FormFeedback>
                                {FormValidationManager.extractError(error)}
                            </FormFeedback>
                        </>
                        )}
                    />
                </FormGroup>
            </Col>
        </Row>       
        <Row>
            <Col md = "6">
            <FormGroup>
                    <Controller
                        control={control}
                        name={"gender"}
                        rules={{
                            required: true,
                        }}
                        render={({
                        field: { onChange, value },
                        fieldState: { error },
                        }) => (
                        <>
                            <Label for="gender">
                                Gender
                            </Label>
                            <Input
                                type="select"
                                name="gender"
                                id="gender"
                                value={value}
                                onChange={onChange}
                                invalid={error !== undefined}
                            >
                                <option value = "male" > Male </option>
                                <option value = "female">  Female </option>

                            </Input>
                            <FormFeedback>
                                {FormValidationManager.extractError(error)}
                            </FormFeedback>
                        </>
                        )}
                    />
                </FormGroup>
            </Col>
            <Col md = "6">
                <FormGroup>
                    <Controller
                        control={control}
                        name={"birthDate"}
                        rules={{
                            required: true,
                        }}
                        render={({
                        field: { onChange, value },
                        fieldState: { error },
                        }) => (
                        <>
                            <Label for="birthDate">
                                Birth Date
                            </Label>
                            <Date
                                id = "birthDate"
                                onChange={onChange} 
                                value={value} 
                                name = "BirthDate" 
                                error = {error}
                            />
                            <FormFeedback>
                                {FormValidationManager.extractError(error)}
                            </FormFeedback>
                        </>
                        )}
                    />
                </FormGroup>
            </Col>
        </Row>    
        <Row>
            <Col md = "6">
                <FormGroup>
                    <Controller
                        control={control}
                        name={"phoneNumber"}
                        rules={{
                            required: true,
                        }}
                        render={({
                        field: { onChange, value },
                        fieldState: { error },
                        }) => (
                        <>
                            
                            <PhoneInput
                                inputStyle={{ width: "100%" }}
                                enableSearch={true}
                                disableSearchIcon={true}
                                preferredCountries={["en"]}
                                country={"en"}
                                onlyCountries={["en"]}
                                placeholder="Phone number"
                                disableDropdown={true}
                                value={value}
                                onChange={(value, data, event, formattedValue) => {
                                onChange(
                                    formattedValue.split(" ")[0] +
                                    value.slice(
                                        formattedValue.split(" ")[0].length - 1
                                    )
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
                            {FormValidationManager.extractError(error)}
                          </div>
                        </>
                        )}
                    />
                </FormGroup>
            </Col>
            <Col md = "6">
                <FormGroup>
                    <Controller
                        control={control}
                        name={"username"}
                        rules={{
                            required: true,
                        }}
                        render={({
                        field: { onChange, value },
                        fieldState: { error },
                        }) => (
                        <>
                            <Label for="username">
                                Username
                            </Label>
                            <Input
                                type="text"
                                name="username"
                                id="username"
                                value={value}
                                onChange={onChange}
                                invalid={error !== undefined}
                            />
                            <FormFeedback>
                                {FormValidationManager.extractError(error)}
                            </FormFeedback>
                        </>
                        )}
                    />
                </FormGroup>
            </Col>
        </Row>      
        <div className="d-flex justify-content-end " style = {{gap: "0.5rem"}}>
            <Button onClick={() =>  handleSubmit(onSubmit)() } color = "primary" style = {{borderRadius: "1rem"}} > Edit </Button>
            <Button onClick={()=> reset()} color = "secondary" style = {{borderRadius: "1rem"}} > Reset </Button>
        </div>    
    </Form>

    </>
    )
}
export default ProfileEdit;
