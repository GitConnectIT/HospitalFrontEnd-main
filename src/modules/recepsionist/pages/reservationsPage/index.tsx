import axios from "axios";
import React, { FC, useState } from "react";
import Table from "../../../../main/components/table/index";
import eFormMode from "../../../../main/assets/enums/eFormMode";
import PageTitle from "../../../../main/components/PageTitle";
import { useNavigate } from "react-router-dom";
import { createAlert } from "../../../../main/store/stores/notification/notification.store";
import eNotificationType from "../../../../main/assets/enums/eNotificationType";
import { useDispatch } from "react-redux";

const ReservationsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onIconClick = async (rowId: number, actionMethod: string) => {
    switch (actionMethod) {
      case eFormMode.Edit:
        navigate(`/recepsionist/reservations/${rowId}`);
        break;
      case eFormMode.Insert:
        dispatch(
          createAlert({
            message: `No action can be commited here by you`,
            type: eNotificationType.Error,
            timeout: 3000,
          })
        );
        break;
    }
  };

  return (
    <div>
      <Table
        pageTitle={<PageTitle>Reservations</PageTitle>}
        controller={"reservation"}
        onIconClick={onIconClick}
        searchable={true}
        showDropdownFilters={false}
        showFilters={false}
      />
    </div>
  );
};

export default ReservationsPage;
