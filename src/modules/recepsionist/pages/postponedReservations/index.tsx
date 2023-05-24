import axios from "axios";
import React, { FC, useState } from "react";
import Table from "../../../../main/components/table/index";
import eFormMode from "../../../../main/assets/enums/eFormMode";
import PageTitle from "../../../../main/components/PageTitle";
import { Alert, Button } from "reactstrap";
import DetailDrawer from "../../../../main/components/DetailDrawer";
import EventManager from "../../../../main/utils/eventManager";
import PostponedReservationForm from "./postponedReservationForm";
import Drawer from "../../../../main/components/Drawer";
import { useForm } from "react-hook-form";
import { handleDateFormat } from "../../../../main/utils/functions";
import Modal from "../../../../main/components/Modal";
import { useDispatch } from "react-redux";
import eNotificationType from "../../../../main/assets/enums/eNotificationType";
import { createAlert } from "../../../../main/store/stores/notification/notification.store";

const PostponedReservations = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [times, setTimes] = useState<any>(null);
  const [whsId, setWhsId] = useState<any>(0);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [reservationDetails, setReservationDetails] = useState<any>();

  const dispatch = useDispatch();

  const { handleSubmit, control, reset } = useForm();

  const onIconClick = async (rowId: number, actionMethod: string) => {
    switch (actionMethod) {
      case eFormMode.Edit:
        const times = await (
          await axios.get(`reservation/${rowId}/availableTimes`)
        ).data;
        const res = await (
          await axios.get(`reservation/${rowId}/details`)
        ).data;
        setTimes(times.data);
        setReservationDetails(res.data);
        setOpen(true);
        break;

      case eFormMode.Insert:
        dispatch(
          createAlert({
            message: `No actions can be commited here`,
            type: eNotificationType.Error,
            timeout: 3000,
          })
        );
        break;
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTimes(null);
  };

  const confirmReservationPostpone = async () => {
    const res: any = await (
      await axios.put(
        `/reservation/${reservationDetails.id}/postponeReservationOfNoTime`,
        {
          workingHourServiceId: whsId,
          email: reservationDetails.email,
        }
      )
    ).data;
    if (res.result) {
      dispatch(
        createAlert({
          message: `Reservation postponed successfully in the times selected`,
          type: eNotificationType.Success,
          timeout: 3000,
        })
      );
      setOpenModal(false);
      handleClose();
      EventManager.raiseRefreshTable("reservation/postponed");
    }
  };

  return (
    <>
      {" "}
      <Table
        pageTitle={<PageTitle>Available Times</PageTitle>}
        controller={"reservation/postponed"}
        onIconClick={onIconClick}
        searchable={false}
        showDropdownFilters={false}
        showFilters={false}
      />
      <Drawer title="Check new hour" show={open} onClose={handleClose}>
        {times && times.length > 0 ? (
          <>
            {times.map((time: any) => {
              return (
                <div
                  style={{
                    display: "block",
                    borderRadius: "1rem",
                    border: "1px solid gray",
                    padding: "0.5rem",
                    marginBottom: "1rem",
                  }}
                  className="onHoverClick"
                  onClick={() => {
                    setOpenModal(true);
                    setWhsId(time.id);
                  }}
                >
                  <div>
                    <span style={{ fontWeight: "bold" }}> Start Time:</span>
                    {handleDateFormat(time.startTime)}
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold" }}> End Time:</span>
                    {handleDateFormat(time.endTime)}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            <div>
              {" "}
              <Alert color="warning"> No times available </Alert>{" "}
            </div>
          </>
        )}
      </Drawer>
      <Modal
        title="Confirm postpone Reservation"
        onClose={() => setOpenModal(false)}
        show={openModal}
        actions={
          <>
            <Button color="primary" onClick={confirmReservationPostpone}>
              {" "}
              Submit{" "}
            </Button>
            <Button color="info" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
          </>
        }
      >
        Are you sure you want to confirm this time postpone reservation?
      </Modal>
    </>
  );
};

export default PostponedReservations;
