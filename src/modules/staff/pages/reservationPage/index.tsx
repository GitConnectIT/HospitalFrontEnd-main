import axios from "axios";
import React, { FC, useState } from "react";
import Table from "../../../../main/components/table/index";
import eFormMode from "../../../../main/assets/enums/eFormMode";
import PageTitle from "../../../../main/components/PageTitle";
import { useDispatch } from "react-redux";
import { createAlert } from "../../../../main/store/stores/notification/notification.store";
import eNotificationType from "../../../../main/assets/enums/eNotificationType";
import EventManager from "../../../../main/utils/eventManager";

const ReservationsPage = () => {
  const dispatch = useDispatch();

  const onIconClick = async (rowId: number, actionMethod: string) => {
    switch (actionMethod) {
      case eFormMode.Edit:
        const m = await (await axios.put(`reservation/${rowId}/succeed`)).data;
        if (m.result) {
          dispatch(
            createAlert({
              message: `Rezervimi u krye me sukses `,
              type: eNotificationType.Success,
              timeout: 3000,
            })
          );
          EventManager.raiseRefreshTable("reservation");
        }
        break;

      case eFormMode.Insert:
        const res = await (
          await axios.post(`reservation/${rowId}/registerStartTime`)
        ).data;
        if (res.result) {
          dispatch(
            createAlert({
              message: `Orari i fillimit te regjstrimit u regjistruar me sukes`,
              type: eNotificationType.Success,
              timeout: 3000,
            })
          );
          EventManager.raiseRefreshTable("reservation");
        }
        break; //DO KONFIRMOHET ORARI I REZERVIMIT
    }
  };

  return (
    <div>
      <Table
        pageTitle={<PageTitle>Reservations</PageTitle>}
        controller={"reservation"}
        onIconClick={onIconClick}
      />
    </div>
  );
};

export default ReservationsPage;
