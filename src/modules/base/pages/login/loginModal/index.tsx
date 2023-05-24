import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import eNotificationType from "../../../../../main/assets/enums/eNotificationType";
import Modal from "../../../../../main/components/Modal";
import { createAlert } from "../../../../../main/store/stores/notification/notification.store";
import formValidationManager from "../../../../../main/utils/formValidationManager";

export interface ILoginModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}
const LoginModal = (props: ILoginModalProps) => {
  const { showModal, setShowModal } = props;
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm();
  const handleFormSubmit = async (data: any) => {
    const response = await axios.post(
      "authentication/forgot-password-send-email",
      data
    );

    if (response?.data.result) {
      dispatch(
        createAlert({
          message: "Email di recupero inviata. Si prega di controllare la posta in arrivo",
          type: eNotificationType.Success,
          timeout: 3000,
        })
      );
    } else {
      dispatch(
        createAlert({
          message: `Qualcosa è andato storto`,
          type: eNotificationType.Error,
          timeout: 3000,
        })
      );
    }
    setShowModal(false);
  };
  return (
    <Modal
      children={
        <Form>
          <FormGroup>
            <Controller
              control={control}
              name={"email" as any}
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
                  <Label for="emailRecover"> Email:</Label>
                  <Input
                    id="emailRecover"
                    type="text"
                    name="email"
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
        </Form>
      }
      show={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      title="Enter your email to get password reset link"
      actions={
        <>
          <Button
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSubmit(handleFormSubmit)();
            }}
            color="success"
          >
           Submit
          </Button>
        </>
      }
    ></Modal>
  );
};
export default LoginModal;
