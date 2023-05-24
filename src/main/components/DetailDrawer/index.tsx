import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import eNotificationType from "../../assets/enums/eNotificationType";
import eFormMode from "../../assets/enums/eFormMode";
import { createAlert } from "../../store/stores/notification/notification.store";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Container } from "reactstrap";
import Drawer from "../Drawer/index";
import useGetUser from "../../hooks/useGetUser";
import eRoleType from "../../assets/enums/eRoleType";

export interface IDetailDrawerProps {
  modeDrawer: eFormMode;
  onClose: () => void;
  formData: any;
  children: React.ReactNode;
  controller?: string;
  onSave?: () => void;
  additionalProp?: any;
  additionalProp2?: any;
  setBackEndId?: (value: any) => void;
  backEndId?: number;
}

const DetailDrawer = (props: IDetailDrawerProps) => {
  const {
    controller,
    onClose,
    modeDrawer,
    formData,
    children,
    onSave,
    additionalProp,
    setBackEndId,
    backEndId,
    additionalProp2,
  } = props;
  const [open, setOpen] = useState<boolean>(false);

  const controllerParts = controller.split("/");

  const methods = useForm();
  const user = useGetUser();
  const { handleSubmit, reset, setValue, formState } = methods;

  const dispatch = useDispatch();

  const handleFormSubmit = async (data: any) => {
    if (user.role == eRoleType.Recepsionist) {
      if (additionalProp2) {
        data["workerId"] = additionalProp2;
      }
    }

    let result: any;

    if (additionalProp) Object.assign(data, additionalProp);

    try {
      switch (modeDrawer) {
        case eFormMode.Edit:
          result = await axios.put(
            `/${controllerParts[0]}/${formData.id}`,
            data
          );
          break;

        case eFormMode.Insert:
          result = await (await axios.post(controller, data)).data;
          if (typeof result.data == "number") setBackEndId(result.data);
          break;
      }
      if (result.result) {
        if (result.data) {
          dispatch(
            createAlert({
              message: `Successful`,
              type: eNotificationType.Success,
              timeout: 3000,
            })
          );
          onSave();
        } else if (!result.data) {
          dispatch(
            createAlert({
              message: "Error",
              type: eNotificationType.Error,
              timeout: 3000,
            })
          );
        }
      }
    } catch (err: any) {
      dispatch(
        createAlert({
          message: err,
          type: eNotificationType.Error,
          timeout: 3000,
        })
      );
    }
  };

  useEffect(() => {
    setOpen(true);
    if (formData) {
      for (const [key, value] of Object.entries(formData)) {
        setValue(key, value);
      }
    }
  }, [formData, setValue]);

  return (
    <>
      <Drawer
        title={
          modeDrawer == "edit"
            ? `Edit ${controllerParts[0]}`
            : `Add ${controllerParts[0]}`
        }
        show={open}
        onClose={() => {
          onClose();
          if (setBackEndId) setBackEndId(0);
          setOpen(false);
          reset();
        }}
        actions={
          <>
            <Button
              color="primary"
              type="submit"
              onClick={() => handleSubmit(handleFormSubmit)()}
              disabled={Object.keys(formState.dirtyFields).length === 0}
            >
              Approve
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                onClose();
                setOpen(false);
                reset();
              }}
            >
              Cancel
            </Button>
          </>
        }
      >
        {formData !== undefined && open && (
          <FormProvider {...methods}>{children}</FormProvider>
        )}
      </Drawer>
    </>
  );
};

export default DetailDrawer;
