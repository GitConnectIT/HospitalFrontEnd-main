import axios from "axios";
import React, { FC, useState } from "react";
import Table from "../../../../main/components/table/index";
import { useNavigate, useParams } from "react-router-dom";
import eFormMode from "../../../../main/assets/enums/eFormMode";
import DetailDrawer from "../../../../main/components/DetailDrawer";
import DeleteModal from "../../../../main/components/ModalDetailDelete";
import DeviceForm from "./deviceForm";
import EventManager from "../../../../main/utils/eventManager";
import { Button } from "reactstrap";
import PageTitle from "../../../../main/components/PageTitle";

const DevicesPage = () => {
  const [modeDrawer, setModeDrawer] = useState(null);
  const [formData, setFormData] = useState<any>(null);
  const [deleteRowId, setDeleteRowId] = useState<number>(0);

  const onIconClick = async (rowId: number, actionMethod: string) => {
    switch (actionMethod) {
      case eFormMode.Edit:
        const m = await (await axios.get(`device/${rowId}`)).data;
        setFormData(m.data);
        setModeDrawer(eFormMode.Edit);
        break;

      case eFormMode.Delete:
        setDeleteRowId(rowId);
        break;
    }
  };

  const handleDeviceAddButton = () => {
    setModeDrawer(eFormMode.Insert);
  };

  const handleClose = () => {
    setModeDrawer(null);
    setFormData(null);
    setDeleteRowId(0);
  };

  const handleCloseModal = () => {
    setDeleteRowId(0);
  };

  return (
    <div>
      <Table
        pageTitle={<PageTitle>Users</PageTitle>}
        controller={"device"}
        actionButton={
          <Button onClick={handleDeviceAddButton} color="primary">
            Add Device
          </Button>
        }
        onIconClick={onIconClick}
      />
      {(modeDrawer || formData) && (
        <DetailDrawer
          onClose={handleClose}
          onSave={() => {
            handleClose();
            EventManager.raiseRefreshTable("device");
          }}
          modeDrawer={modeDrawer}
          formData={formData}
          controller="device"
        >
          <DeviceForm model={formData} mode={modeDrawer} />
        </DetailDrawer>
      )}
      {deleteRowId != 0 && (
        <DeleteModal
          controller="device"
          deleteId={deleteRowId}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default DevicesPage;
