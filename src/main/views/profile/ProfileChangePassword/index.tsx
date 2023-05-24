import axios from "axios"
import React, { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap"
import eNotificationType from "../../../assets/enums/eNotificationType"
import InputIcon from "../../../components/InputIcon"
import { createAlert } from "../../../store/stores/notification/notification.store"
import formValidationManager from "../../../utils/formValidationManager"



const ProfileChangePassword = () =>
{
    const {handleSubmit, control, reset} = useForm();

    const [typeCurrentInput, setTypeCurrentInput] = useState<any>(
        {
            showNewPassword: false,
            showCurrentPassword: false,
            showConfirmNewPassword: false,
        }
    )

    const handleClickShowCurrentPassword = () => {
        setTypeCurrentInput({...typeCurrentInput, showCurrentPassword: !typeCurrentInput.showCurrentPassword});
    };

    const handleClickShowNewPassword = () => {
        setTypeCurrentInput({...typeCurrentInput, showNewPassword: !typeCurrentInput.showNewPassword});
    };

    const handleClickShowConfirmNewPassword = () => {
        setTypeCurrentInput({
        ...typeCurrentInput,
        showConfirmNewPassword: !typeCurrentInput.showConfirmNewPassword,
        });
    };



    const dispatch = useDispatch();

    const handleFormSubmit = async (data: any) =>
    {
        try
        {
            const res: any = await axios.put("/Authentication/Change-Password",data);
            if(res.data.result)
            {
                dispatch(createAlert({
                    message: res.data.successMessage,
                    timeout: 3000,
                    type: eNotificationType.Success
                }))
            }
        }catch(err:any)
        {
            dispatch(createAlert({
                message: err,
                timeout: 3000,
                type: eNotificationType.Success
            }))
        }
    }
    
    return(

        <> 
        <Form className="mt-3" onSubmit = {handleSubmit(handleFormSubmit)}>
            <Row>
                <Col md = "12">
                    <FormGroup>
                    <Controller
                      control={control}
                      name="currentPassword"
                      rules={{ 
                            required: true,
                            pattern: {
                            value:
                                /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                            message: "Password must be at least 8 characters with 1 upper case, 1 lower case letter, 1 special character and 1 number"
                            },
                     }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                        <Label htmlFor="currentPassword">
                            Current Password
                        </Label>
                          <InputIcon
                            iconName="fa-solid fa-key"
                            id="currentPassword"
                            type={  typeCurrentInput.showCurrentPassword ? "text" : "password" }                                         
                            name="currentPassword"
                            placeholder="Current password"
                            value={value}
                            onChange={onChange}
                            error={error}
                            onIconClick={handleClickShowCurrentPassword}
                          />
                          <FormFeedback>
                            {formValidationManager.extractError(error)}
                          </FormFeedback>
                        </>
                      )}
                    />
                    </FormGroup>
                </Col>
                <Col md = "12">
                    <FormGroup>
                        <Controller 
                            control={control}
                            name="newPassword"
                            rules={{ 
                                required: true,
                                pattern: {
                                value:
                                    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                message: "Password must be at least 8 characters with 1 upper case, 1 lower case letter, 1 special character and 1 number"
                                },
                            }}
                            render={({
                            field: { onChange, value },
                            fieldState: { error },
                            }) => (
                                <> 
                                    <Label htmlFor="newPassword">
                                        New Password
                                    </Label>
                                    <InputIcon
                                        iconName="fa-solid fa-key"
                                        id="newPassword"
                                        type={  typeCurrentInput.showNewPassword ? "text" : "password" }                                         
                                        name="newPassword"
                                        placeholder="New password"
                                        value={value}
                                        onChange={onChange}
                                        error={error}
                                        onIconClick={handleClickShowNewPassword}
                                    />
                                    <FormFeedback>
                                        {formValidationManager.extractError(error)}
                                    </FormFeedback>

                                </>

                            )}
                        />
                    </FormGroup>
                </Col>
                <Col md = "12">
                    <FormGroup>
                        <Controller 
                            control={control}
                            name="confirmNewPassword"
                            rules={{ 
                                required: true,
                                pattern: {
                                value:
                                    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                message: "Password must be at least 8 characters with 1 upper case, 1 lower case letter, 1 special character and 1 number"
                                },
                            }}
                            render={({
                            field: { onChange, value },
                            fieldState: { error },
                            }) => (
                                <> 
                                    <Label htmlFor="confirmNewPassword">
                                        Confirm New Password
                                    </Label>
                                    <InputIcon
                                        iconName="fa-solid fa-key"
                                        id="confirmNewPassword"
                                        type={ typeCurrentInput.showConfirmNewPassword ? "text" : "password" }                                         
                                        name="confirmNewPassword"
                                        placeholder="Confirm New password"
                                        value={value}
                                        onChange={onChange}
                                        error={error}
                                        onIconClick={handleClickShowConfirmNewPassword}
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
        </Form>
        <div className="d-flex justify-content-end " style = {{gap: "0.5rem"}}>
            <Button onClick={() =>  handleSubmit(handleFormSubmit)() } color = "primary" style = {{borderRadius: "1rem"}} > Change password </Button>
            <Button onClick={()=> reset()} color = "secondary" style = {{borderRadius: "1rem"}} > Reset </Button>
        </div>         
    </>
    )
}

export default ProfileChangePassword;