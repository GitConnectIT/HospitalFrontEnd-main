import axios from "axios";
import React, { FC, useState } from "react";
import Table from "../../../../main/components/table/index";
import { useNavigate, useParams } from "react-router-dom";
import eFormMode from "../../../../main/assets/enums/eFormMode";
import DetailDrawer from "../../../../main/components/DetailDrawer";
import DeleteModal from "../../../../main/components/ModalDetailDelete";
import WorkersForm from "./workersForm";
import EventManager from "../../../../main/utils/eventManager";
import { Button } from "reactstrap";
import PageTitle from "../../../../main/components/PageTitle";

const WorkersPage: FC = () => {
  const [modeDrawer, setModeDrawer] = useState(null);
  const [formData, setFormData] = useState<any>(null);
  const [deleteRowId, setDeleteRowId] = useState<number>(0);

  const onIconClick = async (rowId: number, actionMethod: string) => {
    switch (actionMethod) {
      case eFormMode.Edit:
        const m = await (await axios.get(`user/${rowId}/details`)).data;
        setFormData(m.data);
        setModeDrawer(eFormMode.Edit);
        break;

      case eFormMode.Delete:
        setDeleteRowId(rowId);
        break;
    }
  };

  const handleStaffAddButton = () => {
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
        controller={"user"}
        actionButton={
          <Button onClick={handleStaffAddButton} color="primary">
            Add Worker
          </Button>
        }
        onIconClick={onIconClick}
      />
      {(modeDrawer || formData) && (
        <DetailDrawer
          onClose={handleClose}
          onSave={() => {
            handleClose();
            EventManager.raiseRefreshTable("user");
          }}
          modeDrawer={modeDrawer}
          formData={formData}
          controller="user"
        >
          <WorkersForm model={formData} modeDrawer={modeDrawer} />
        </DetailDrawer>
      )}
      {deleteRowId != 0 && (
        <DeleteModal
          controller="user"
          deleteId={deleteRowId}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default WorkersPage;
