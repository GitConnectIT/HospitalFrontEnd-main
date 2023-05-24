import axios from "axios";
import React, { FC, useState } from "react";
import Table from "../../../../main/components/table/index";
import eFormMode from "../../../../main/assets/enums/eFormMode";
import PageTitle from "../../../../main/components/PageTitle";
import { Button } from "reactstrap";
import DetailDrawer from "../../../../main/components/DetailDrawer";
import EventManager from "../../../../main/utils/eventManager";
import ReservationForm from "./workingHourServiceForm";

const WorkingHourServicePage = () => {
  const [modeDrawer, setModeDrawer] = useState(null);
  const [formData, setFormData] = useState<any>(null);
  const [rowId, setRowId] = useState<number>(0);

  const [backEndId, setBackEndId] = useState<number>(0);

  const onIconClick = async (rowId: number, actionMethod: string) => {
    switch (actionMethod) {
      case eFormMode.Edit:
        const m = await (await axios.get(`reservation/${rowId}`)).data;
        setFormData(m.data);
        setModeDrawer(eFormMode.Edit);
        break;

      case eFormMode.Insert:
        setRowId(rowId);
        setModeDrawer(eFormMode.Insert);
        break;
    }
  };

  const handleClose = () => {
    setModeDrawer(null);
    setFormData(null);
  };

  return (
    <div>
      <Table
        pageTitle={<PageTitle>Available Times</PageTitle>}
        controller={"workingHourServices"}
        onIconClick={onIconClick}
        searchable={false}
        showDropdownFilters={false}
        showFilters={false}
      />
      {(modeDrawer || formData) && (
        <DetailDrawer
          setBackEndId={setBackEndId}
          onClose={handleClose}
          onSave={() => {
            // handleClose();

            EventManager.raiseRefreshTable("workingHourServices");
            EventManager.raiseRefreshTable("reservation");
          }}
          modeDrawer={modeDrawer}
          formData={formData}
          controller="reservation"
          additionalProp={{ workingHourServiceId: rowId }}
        >
          <ReservationForm model={formData} backEndId={backEndId} />
        </DetailDrawer>
      )}
    </div>
  );
};

export default WorkingHourServicePage;
