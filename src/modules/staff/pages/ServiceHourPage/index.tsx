import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import Table from "../../../../main/components/table/index";
import { useNavigate, useParams } from "react-router-dom";
import eFormMode from "../../../../main/assets/enums/eFormMode";
import DetailDrawer from "../../../../main/components/DetailDrawer";
import DeleteModal from "../../../../main/components/ModalDetailDelete";
import EventManager from "../../../../main/utils/eventManager";
import { Button } from "reactstrap";
import PageTitle from "../../../../main/components/PageTitle";
import WorkingHourForm from "./workingHourForm";
import { createAlert } from "../../../../main/store/stores/notification/notification.store";
import eNotificationType from "../../../../main/assets/enums/eNotificationType";
import { useDispatch } from "react-redux";

const ServiceHourPage: FC = () => {
  const [modeDrawer, setModeDrawer] = useState(null);
  const [formData, setFormData] = useState<any>(null);
  const dispatch = useDispatch();

  const onIconClick = async (rowId: number, actionMethod: string) => {
    switch (actionMethod) {
      case eFormMode.Edit:
        const m = await (await axios.get(`workingHourServices/${rowId}`)).data;
        setFormData(m.data);
        setModeDrawer(eFormMode.Edit);
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

  const handleAddServiceHourButton = () => {
    setModeDrawer(eFormMode.Insert);
  };

  const handleClose = () => {
    setModeDrawer(null);
    setFormData(null);
  };

  // const handleCloseModal = () => {
  //   setDeleteRowId(0);
  // };

  return (
    <div>
      <Table
        pageTitle={<PageTitle>Users</PageTitle>}
        controller={"workingHourServices"}
        actionButton={
          <Button onClick={handleAddServiceHourButton} color="primary">
            Add Service Hour
          </Button>
        }
        onIconClick={onIconClick}
      />
      {(modeDrawer || formData) && (
        <DetailDrawer
          onClose={handleClose}
          onSave={() => {
            handleClose();
            EventManager.raiseRefreshTable("workingHourServices");
          }}
          modeDrawer={modeDrawer}
          formData={formData}
          controller="workingHourServices"
        >
          <WorkingHourForm model={formData} />
        </DetailDrawer>
      )}
      {/* {deleteRowId != 0 && (
        <DeleteModal
          controller="devices"
          deleteId={deleteRowId}
          handleCloseModal={handleCloseModal}
        />
      )} */}
    </div>
  );
};

export default ServiceHourPage;
