import ISchema from "../../interfaces/ISchema";
import Slot from "./Slot";
import { Button, Form as FormRS } from "reactstrap";
import "./style.scss";
import { createAlert } from "../../store/stores/notification/notification.store";
import { useDispatch } from "react-redux";
import eNotificationType from "../../assets/enums/eNotificationType";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import useFormLoader from "../../hooks/useFormLoader";
import { Trans } from "react-i18next";
export interface ITimeSlot {
  value: string;
  label: string;
}
const Form = (props: ISchema) => {
  const [loading, setLoading] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [model, setModel] = useState(null);
  const dispatch = useDispatch();
  const { slots, closedDates, offDays, bookingUrlName } = props;
  const { formObject } = useFormLoader({
    onChangeModel: (model) => setModel(model),
  });
  const { handleSubmit, reset } = formObject;

  const onSubmitHandler = async (data: any) => {
    setLoading(!loading);
    const submitData = slots.map((slot) => ({
      fieldId: slot.id,
      fieldValue: data[slot.propertyName],
      fieldPropertyName: slot.propertyName,
    }));
    const response = await axios.post(
      `reservation/${bookingUrlName}`,
      submitData
    );
    if (response?.data.result) {
      dispatch(
        createAlert({
          message: `Prenotazione avvenuta con successo`,
          type: eNotificationType.SUCCESS,
          timeout: 3000,
        })
      );
      setLoading(false);
      setResetForm(true);
    } else {
      dispatch(
        createAlert({
          message: `Prenotazione non riuscita`,
          type: eNotificationType.ERROR,
          timeout: 3000,
        })
      );
      setLoading(false);
    }
  };
  useEffect(() => {
    if (resetForm) {
      reset();
      setResetForm(false);
    }
  }, [resetForm]);
  return (
    <div className="scheduler-form">
      {loading && <Spinner color="primary" />}
      {/* <h4 className="pt-4"><Trans i18nKey={"schedulePage.enterYourDetails"}>Enter your details</Trans></h4> */}
      {slots && (
        <FormRS onSubmit={handleSubmit(onSubmitHandler)} className="mx-auto">
          <div className="input-display">
            {slots.map((slot: any) => {
              if (slot.propertyName) {
                return (
                  <Slot
                    key={slot.id}
                    slot={slot}
                    offDays={offDays}
                    closedDates={closedDates}
                    formObject={formObject}
                    bookingUrlName={bookingUrlName}
                    model={model}
                  ></Slot>
                );
              }
              return null;
            })}
          </div>
          <div className="schedule-page-submit-btn">
            <Button
              className="my-2 d-block s-button"
              outline
              color="success"
              type="submit"
            >
              <Trans i18nKey={"generic.submit"}>Submit</Trans>
            </Button>
          </div>
        </FormRS>
      )}
    </div>
  );
};
export default Form;
